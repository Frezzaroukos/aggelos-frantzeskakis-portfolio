# Aggelos Frantzeskakis — Digital Craft Portfolio

A bilingual, cinematic portfolio for **Aggelos Frantzeskakis**, built around useful digital experiences, resilient products, local intelligence, and visual experimentation.

The site combines an editorial portfolio interface with a dedicated creative AI practice: **Infinite Creative AI Space**.

## Infinite Creative AI Space

> We do not ask AI to replace imagination. We ask it to stretch the frame.

**Infinite Creative AI Space** is a cross-model creative studio for visual experiments, AI-assisted transformations, cinematic compositions, and finished digital artefacts. It is intentionally independent of any single model, provider, or aesthetic. Different tools can participate in the process, but the final result is shaped by human direction, curation, and taste.

The studio turns raw visual ideas into deliberate outcomes: restored images, enhanced and print-ready exports, alternate art directions, cinematic posters, cosmic scenes, and new visual languages. It treats every generation as a study in direction rather than an automatic result.

### Brand principles

The practice begins with a signal: a feeling, a question, a reference, or an impossible brief. It keeps the human eye in the loop, uses transformation with intent, allows different styles to collide, respects the source image during restoration, and turns concepts into usable artefacts. The space remains open to new models, mediums, and visual grammars.

### Studio architecture

| Section | Focus | Typical outputs |
| --- | --- | --- |
| **Signal Room** | Prompts, references, and visual direction | Creative briefs, source studies, art direction |
| **Transformation Lab** | Restoration, enhancement, clarity, and scale | Refined images, upscales, print exports |
| **Style Atlas** | Controlled visual languages and style experiments | Anime/manga, cyberpunk, retro 80s, painterly variants |
| **Cinematic Worlds** | Narrative compositions and atmospheric key art | Posters, character scenes, cosmic worlds |
| **Model Constellation** | Tools, model roles, workflows, and comparisons | Pipeline notes, experiments, model studies |
| **Archive / Final Forms** | Curated finished work and case studies | Editions, selected studies, final artefacts |

The complete brand manifesto and editorial guidance are available in [`BRAND-INFINITE-CREATIVE-AI-SPACE.md`](./BRAND-INFINITE-CREATIVE-AI-SPACE.md).

## What the website includes

The portfolio is structured as a scrollable editorial experience with bilingual English/Greek copy. Its main chapters are:

- **Arrival:** a cinematic introduction to the practice.
- **Work:** a live GitHub-grounded selection of projects with filters and project studies.
- **Skills:** current practice areas, including systems, resilient products, and intelligence.
- **Infinite AI Space:** the creative AI studio, its categories, manifesto quote, and visual identity.
- **Stack:** the technologies and product patterns represented across the work.
- **Profile:** context about the person and the working philosophy behind the projects.
- **Contact:** direct contact, social links, and a resilient form-delivery fallback.

The interface supports a light/dark theme switch, responsive layouts, reduced-motion behavior, animated transitions, accessible labels, project detail dialogs, and a CV preview flow.

## Brand assets

The Infinite Creative AI Space identity is shipped as editable SVG assets:

| Asset | Location | Purpose |
| --- | --- | --- |
| Symbol logo | [`client/public/assets/infinite-creative-ai-space-logo.svg`](./client/public/assets/infinite-creative-ai-space-logo.svg) | Favicon-style symbol, section mark, and future app icon |
| Cosmic banner | [`client/public/assets/infinite-creative-ai-space-banner.svg`](./client/public/assets/infinite-creative-ai-space-banner.svg) | Hero/banner visual with text-safe space |
| Brand manifesto | [`BRAND-INFINITE-CREATIVE-AI-SPACE.md`](./BRAND-INFINITE-CREATIVE-AI-SPACE.md) | Brand purpose, voice, architecture, and editorial principles |

The SVG files are deliberately editable, scalable, and independent from a specific image-generation provider.

## Technology

The project uses the following core technologies:

| Layer | Technology |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Styling | CSS, Tailwind utilities, custom editorial design system |
| Motion | Framer Motion |
| Routing | Wouter |
| UI | Radix primitives, Lucide icons, Sonner notifications |
| Server | Express, TypeScript, esbuild |
| Data | GitHub profile and repository snapshots under `client/src/data` |
| Quality | TypeScript checks, Vite production build, Prettier |

## Requirements

Use **Node.js 20 or newer** and **pnpm**. The repository includes a lockfile, so the recommended workflow is to install dependencies with the frozen lockfile.

## Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Frezzaroukos/aggelos-frantzeskakis-portfolio.git
cd aggelos-frantzeskakis-portfolio
```

Install the exact locked dependencies:

```bash
pnpm install --frozen-lockfile
```

## Local development

Start the Vite development server:

```bash
pnpm dev
```

The development server exposes the application on the host configured by Vite. Open the local URL printed in the terminal, commonly `http://localhost:5173`.

For a production-like preview, first build the application and then run the preview server:

```bash
pnpm build
pnpm preview
```

## Validation and production build

Run the TypeScript check without emitting files:

```bash
pnpm check
```

Create the production client bundle and server output:

```bash
pnpm build
```

Run the generated production server:

```bash
pnpm start
```

Format the repository with the configured Prettier setup:

```bash
pnpm format
```

The production build writes the client output to `dist/public` and the bundled server entry to `dist/index.js`.

## Project structure

```text
.
├── BRAND-INFINITE-CREATIVE-AI-SPACE.md
├── client/
│   ├── public/assets/
│   │   ├── infinite-creative-ai-space-banner.svg
│   │   └── infinite-creative-ai-space-logo.svg
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── data/
│       ├── hooks/
│       ├── lib/
│       │   └── uiCopy.ts
│       ├── pages/
│       │   └── Home.tsx
│       └── index.css
├── server/
├── package.json
├── pnpm-lock.yaml
└── vite.config.ts
```

## Editing the Infinite Creative AI Space

The section is implemented in [`client/src/pages/Home.tsx`](./client/src/pages/Home.tsx). Its English and Greek content lives in [`client/src/lib/uiCopy.ts`](./client/src/lib/uiCopy.ts), which keeps translations separate from layout logic. The visual system is defined in [`client/src/index.css`](./client/src/index.css).

To add a new studio category, extend `aiSpaceCategories` in both language objects. To add a new chapter to the top navigation, update the `chapters` array in `Home.tsx` and add its translated label under `nav` in `uiCopy.ts`.

## Design direction

The portfolio uses an editorial and cinematic language: deep navy and charcoal foundations, ivory typography, ultraviolet and electric-blue energy, controlled crimson accents, orbital geometry, restrained grain, and generous spacing. The goal is to make technical work feel legible without flattening its atmosphere.

The AI Space follows the same principle. It is expressive enough to hold visual experiments, but structured enough to support real case studies, repeatable workflows, and professional delivery.

## Contribution and extension

This repository is a personal portfolio and creative workspace. New additions should preserve the existing bilingual copy layer, responsive behavior, accessibility labels, reduced-motion support, and editorial hierarchy. New AI experiments should document their source, intended transformation, tools or models involved, human decisions, and final use case.

## License and usage

Unless otherwise stated, the portfolio code and original brand assets are personal project materials belonging to Aggelos Frantzeskakis. Do not reuse personal portfolio content, visual artwork, profile data, or branding as if it were your own. Contact the repository owner before redistributing or adapting the work.

## Links

- [Repository](https://github.com/Frezzaroukos/aggelos-frantzeskakis-portfolio)
- [Infinite Creative AI Space manifesto](./BRAND-INFINITE-CREATIVE-AI-SPACE.md)
- [Infinite Creative AI Space logo](./client/public/assets/infinite-creative-ai-space-logo.svg)
- [Infinite Creative AI Space banner](./client/public/assets/infinite-creative-ai-space-banner.svg)
