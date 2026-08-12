# Portable Deployment Guide

## Current state

The portfolio is now portable for independent development and deployment. The Pegasus artwork, AF brand mark, and factual CV are committed under `client/public/assets/`, and application code references them through `/assets/...` paths. The Manus storage proxy has been removed from `vite.config.ts`; no Forge credential is required to render the critical visual identity or open the CV.

| Concern | Portable implementation |
| --- | --- |
| Pegasus hero and loader | `client/public/assets/pegasus.webp` |
| AF brand mark and favicon | `client/public/assets/af-brand-mark.webp` |
| CV preview/download source | `client/public/assets/Aggelos-Frantzeskakis-CV.pdf` |
| Asset references | Absolute site-relative `/assets/...` URLs |
| Static build output | `dist/public` |
| Manus storage dependency | Removed from the Vite storage middleware |
| Contact delivery | `mailto:` fallback until `VITE_FORMSPREE_ENDPOINT` is configured |

## Local verification

```bash
pnpm install
pnpm check
pnpm build
pnpm preview --host 127.0.0.1
```

Open the preview address and verify the initial loader, Pegasus hero, favicon, Profile CV preview, direct PDF link, and CV download action. The build output for a static host is `dist/public`.

## Static-host settings

Use `pnpm install` as the install command, `pnpm build` as the build command, and `dist/public` as the publish directory. If the host supports SPA rewrites, route unknown paths to `/index.html`. The portfolio currently uses the root route, so no backend or database is required for the visual experience.

## Formspree

Set `VITE_FORMSPREE_ENDPOINT` in the deployment environment to the real Formspree form endpoint. If the variable is absent, the portfolio intentionally keeps the direct email fallback rather than pretending that an external submission service is active.

## Still required before public professional launch

Replace the factual draft CV with the final verified CV when ready. Add the real LinkedIn URL if you want LinkedIn to appear beside GitHub and Instagram. Add project screenshots or case-study media only after selecting the images that can be publicly shared. Keep the GitHub repository private until the content, contact endpoint, personal details, and final assets have been reviewed.
