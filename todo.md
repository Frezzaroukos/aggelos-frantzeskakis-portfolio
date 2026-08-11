# Pegasus Portfolio Upgrade TODO

- [x] Fetch and normalize the GitHub profile and repository data for Frezzaroukos.
- [x] Add a GitHub profile section with avatar, bio, metrics, and profile link.
- [x] Add a real repository showcase with language, stars, forks, topics, and links.
- [x] Replace placeholder portfolio copy with stronger personal-brand content and editable project data.
- [x] Add skills, capabilities, workflow, and services sections.
- [x] Add premium motion interactions, scroll reveal behavior, cursor/hover details, and reduced-motion fallbacks.
- [x] Improve responsive navigation, accessibility, metadata, and visual hierarchy.
- [x] Verify the site in desktop and mobile viewports, run type checking/build checks, and save a new checkpoint.

## Style guardrails

- Keep the Ethereal Motion direction: generous white space, refined serif display typography, Poppins body text, charcoal text, restrained soft-gold accent, and fluid but purposeful motion.
- Avoid generic cards, excessive rounded corners, purple gradients, and fabricated testimonials or reviews.
- Keep all media outside the project directory and reference uploaded assets through webdev storage paths.

## Editable content notes

- Replace placeholder project entries with the user's real work when supplied.
- Keep GitHub-derived repository facts visibly sourced from the user's GitHub profile/repositories.
- Keep contact links and social links editable in one data section.

## Verification checklist

- [x] GitHub data loads or falls back gracefully when unavailable.
- [x] All navigation anchors work.
- [x] Focus states and reduced-motion behavior are present.
- [x] Mobile layout remains readable and usable.
- [x] No build or TypeScript errors remain.
- [ ] New checkpoint is created after final verification.

## Style Decisions

- Use a calm, gallery-like composition with asymmetric hero balance and a subtle editorial grid only where it improves scanability.
- Use the Pegasus as a signature visual rather than repeating it across every section.
- Treat GitHub repositories as evidence of craft: concise, factual, and visually secondary to the personal brand.
