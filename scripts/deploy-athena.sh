#!/usr/bin/env bash
# Build the site and publish it to sparshr.scripts.mit.edu.
#
#   ./scripts/deploy-athena.sh
#
# Override the Athena username or host with environment variables:
#   ATHENA_USER=sparshr ATHENA_HOST=athena.dialup.mit.edu ./scripts/deploy-athena.sh

set -euo pipefail

ATHENA_USER="${ATHENA_USER:-sparshr}"
ATHENA_HOST="${ATHENA_HOST:-athena.dialup.mit.edu}"
REMOTE_DIR="${REMOTE_DIR:-web_scripts}"

cd "$(dirname "$0")/.."

echo "==> Building"
npm run build

if [ ! -f dist/index.html ]; then
  echo "Build produced no dist/index.html — aborting." >&2
  exit 1
fi

echo "==> Publishing to ${ATHENA_USER}@${ATHENA_HOST}:~/${REMOTE_DIR}/"
# --delete keeps the remote in sync with dist/. Everything the site needs is
# in dist/, so nothing outside it should live in web_scripts.
rsync -avz --delete \
  --exclude '.DS_Store' \
  dist/ "${ATHENA_USER}@${ATHENA_HOST}:${REMOTE_DIR}/"

echo "==> Refreshing AFS read permissions"
ssh "${ATHENA_USER}@${ATHENA_HOST}" \
  "fs sa ~/${REMOTE_DIR} system:anyuser rl && \
   find ~/${REMOTE_DIR} -type d -exec fs sa {} system:anyuser rl \;"

echo "==> Done: https://sparshr.scripts.mit.edu/"
