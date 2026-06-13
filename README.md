# Sparsh Roy Portfolio

Personal portfolio for AI/ML and research work, health and clinical AI, local-first systems, robotics, and social-impact products.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Local Development

```bash
npm install
npm run dev
```

The local site runs at the URL printed by Vite, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

When changes are pushed to `main` or `master`, GitHub Actions builds the Vite app and deploys `dist/` to GitHub Pages.

In the repository settings, set GitHub Pages source to:

```text
GitHub Actions
```

## Public Assets

Files in `public/` are served from the site root. The portfolio uses this folder for:

- `avatar.png`
