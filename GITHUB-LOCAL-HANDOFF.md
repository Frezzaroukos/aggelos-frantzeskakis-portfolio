# Aggelos Portfolio — GitHub to Local Handoff

## Repository

The portfolio is stored in the private repository `Frezzaroukos/aggelos-frantzeskakis-portfolio`:

`https://github.com/Frezzaroukos/aggelos-frantzeskakis-portfolio`

The repository uses the `main` branch. Existing project repositories were not modified. The critical portfolio assets are now committed in `client/public/assets/`, so the visual identity and CV do not depend on Manus storage or Forge credentials.

## Recommended desktop setup

Install Git, Node.js 22 or a current LTS release, and pnpm. Then open Terminal, PowerShell, or a similar shell in the folder where you keep development projects.

```bash
git clone https://github.com/Frezzaroukos/aggelos-frantzeskakis-portfolio.git
cd aggelos-frantzeskakis-portfolio
pnpm install
pnpm dev
```

Open the local address shown by Vite, usually `http://localhost:5173/` or the port printed in the terminal. Keep the terminal running while an AI coding tool edits the project.

## Portable assets and independent deployment

The repository includes the optimized Pegasus artwork at `client/public/assets/pegasus.webp`, the AF brand mark at `client/public/assets/af-brand-mark.webp`, and the current factual CV at `client/public/assets/Aggelos-Frantzeskakis-CV.pdf`. The React code references these files through `/assets/...` paths. Do not restore `/manus-storage/...` references: those are Manus-development paths and are not required for an independent host.

For a static host, use the following build settings: install command `pnpm install`, build command `pnpm build`, and publish directory `dist/public`. If the host expects a single-page application fallback, rewrite all unknown routes to `/index.html`; the current portfolio itself uses the root route.

## Updating an existing local copy

Before asking another AI to modify the project, synchronize the local branch:

```bash
cd aggelos-frantzeskakis-portfolio
git switch main
git pull --ff-only origin main
pnpm install
pnpm check
```

After making changes, verify and commit them:

```bash
pnpm check
pnpm build
git status
git add client vite.config.ts GITHUB-LOCAL-HANDOFF.md package.json pnpm-lock.yaml README.md
git commit -m "Refine portfolio navigation and content"
git push origin main
```

If an AI tool creates or changes another file, inspect `git status` before committing and include that file intentionally. Do not commit secrets, API keys, `.env` files, personal browser data, or generated build output unless the project specifically requires it.

## Using another AI coding tool

Open the cloned repository as the project folder. Give the AI the current goal, the exact files it may edit, and the acceptance criteria. A useful instruction is: “Keep the horizontal desktop gallery, preserve the iPhone vertical fallback, do not change GitHub repository visibility, run `pnpm check` and `pnpm build`, and explain every changed file.” Ask the AI to create small commits so changes can be reviewed or reverted safely.

## Publishing later

Keep the GitHub repository private while iterating. When the portfolio is ready for professional use, review the repository contents, remove anything personal or secret, confirm the README and metadata, and then change visibility from the GitHub repository Settings page. The managed Manus project visibility is separate from GitHub repository visibility, so review both before publishing.

## Recovery

To discard uncommitted local edits, first inspect them:

```bash
git diff
```

For a clean return to the latest GitHub commit, use:

```bash
git restore .
git clean -fd
```

Run those cleanup commands only when you are certain that uncommitted work is no longer needed. For important milestones, create a Git commit before experimenting.
