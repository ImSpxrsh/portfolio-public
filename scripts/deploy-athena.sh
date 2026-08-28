#!/usr/bin/env bash
# Build the site and publish it to sparshr.scripts.mit.edu.
#
#   ./scripts/deploy-athena.sh              # build + deploy
#   ./scripts/deploy-athena.sh --no-build   # deploy the existing dist/
#
# Athena requires Duo on every SSH connection, and athena.dialup.mit.edu is a
# round-robin pool: each new connection lands on a different machine, and those
# hosts drop the non-interactive session a transfer needs. So we open ONE master
# connection, authenticate once, and run every remote step over that socket.
#
# Overrides:
#   ATHENA_USER=sparshr ATHENA_HOST=scripts.mit.edu REMOTE_DIR=web_scripts

set -euo pipefail

ATHENA_USER="${ATHENA_USER:-sparshr}"
ATHENA_HOST="${ATHENA_HOST:-athena.dialup.mit.edu}"
REMOTE_DIR="${REMOTE_DIR:-web_scripts}"
TARGET="${ATHENA_USER}@${ATHENA_HOST}"

cd "$(dirname "$0")/.."

if [ "${1:-}" != "--no-build" ]; then
  echo "==> Building"
  npm run build
fi

[ -f dist/index.html ] || { echo "No dist/index.html — aborting." >&2; exit 1; }

# --- one authenticated connection, reused by every step ---------------------
# Keep the socket path short; macOS caps unix socket paths near 104 chars.
SOCKET="/tmp/athena-cm-$$"
SSH_OPTS=(-o "ControlMaster=auto" -o "ControlPath=${SOCKET}" -o "ControlPersist=10m")

cleanup() { ssh -O exit -o "ControlPath=${SOCKET}" "$TARGET" 2>/dev/null || true; }
trap cleanup EXIT

echo "==> Connecting to ${TARGET} (Duo prompt appears once)"
ssh "${SSH_OPTS[@]}" "$TARGET" "mkdir -p ~/${REMOTE_DIR}"
echo "    connected."

echo "==> Publishing to ~/${REMOTE_DIR}/"
if rsync -az --delete --exclude '.DS_Store' \
     -e "ssh ${SSH_OPTS[*]}" \
     dist/ "${TARGET}:${REMOTE_DIR}/"; then
  echo "    synced via rsync."
else
  # Athena login dotfiles can print banner text that corrupts rsync's stream,
  # and not every host has rsync on a non-interactive PATH. scp speaks the
  # SFTP subsystem instead, which is immune to both.
  echo "==> rsync failed; falling back to scp"
  ssh "${SSH_OPTS[@]}" "$TARGET" "rm -rf ~/${REMOTE_DIR}.new && mkdir -p ~/${REMOTE_DIR}.new"
  scp "${SSH_OPTS[@]}" -q -r dist/. "${TARGET}:${REMOTE_DIR}.new/"
  ssh "${SSH_OPTS[@]}" "$TARGET" "
    rm -rf ~/${REMOTE_DIR}.old &&
    if [ -d ~/${REMOTE_DIR} ]; then mv ~/${REMOTE_DIR} ~/${REMOTE_DIR}.old; fi &&
    mv ~/${REMOTE_DIR}.new ~/${REMOTE_DIR} &&
    rm -rf ~/${REMOTE_DIR}.old"
  echo "    copied via scp."
fi

echo "==> Applying AFS read permissions"
# Non-fatal: the files are already published by this point.
if ssh "${SSH_OPTS[@]}" "$TARGET" \
     "find ~/${REMOTE_DIR} -type d -print0 | xargs -0 -n1 -I{} fs sa {} system:anyuser rl"; then
  echo "    permissions applied."
else
  echo "    warning: could not set AFS permissions."
  echo "    check with: ssh ${TARGET} 'fs la ~/${REMOTE_DIR}'"
fi

echo "==> Done: https://sparshr.scripts.mit.edu/"
