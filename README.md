# Sparsh Roy — Portfolio

Personal portfolio for research and engineering work across AI/ML, health data,
computational biology, local-first systems, robotics, and social-impact
products.

Live at **https://sparshr.scripts.mit.edu/**

## Where things live

Publications are **not** maintained in this repo. The canonical, maintained list
is on the MIT site:

- Publications — https://sites.mit.edu/sparsh/publications/
- Courses — https://sites.mit.edu/sparsh/courses/
- Blog — https://sites.mit.edu/sparsh/blog/

The portfolio's Research section mirrors a selection of that list and links out
to it. When a new paper lands, update the MIT site first, then optionally add it
to `src/data/content.ts`.

## Tech stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide

## Project layout

```text
src/
  data/content.ts        All site content: profile, affiliations, publications,
                         projects, experience, skills, nav. Edit here first.
  components/            One file per section, plus shared primitives.
  App.tsx                Section composition and ordering.
  index.css              Global styles, focus rings, theme tokens.
public/                  Served at the site root: avatar, resume PDF,
                         llms.txt, robots.txt, sitemap.xml, .htaccess.
scripts/deploy-athena.sh Build + publish to scripts.mit.edu.
```

Content and presentation are separated on purpose: almost every routine update
(a new paper, a new role, a changed title) is a one-file edit in
`src/data/content.ts`.

## Local development

```bash
npm install
npm run dev
```

Vite serves at http://localhost:5173.

## Build

```bash
npm run build
```

Output lands in `dist/`.

## Deploy to MIT Athena (scripts.mit.edu)

One command, from a machine with your Athena SSH access:

```bash
npm run deploy
```

That builds `dist/`, rsyncs it to `~/web_scripts` on Athena, and reapplies the
`system:anyuser rl` AFS permission that makes the files publicly readable.

See `scripts/deploy-athena.sh` for the manual equivalent and for the
`ATHENA_USER` / `ATHENA_HOST` overrides.

## A note on affiliations

This site describes research appointments by **institution and research focus**
rather than by individual lab name. That is deliberate — please keep it that way
when editing `src/data/content.ts`.
