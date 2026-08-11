# Pegasus Portfolio Horizontal Upgrade TODO

- [x] Re-fetch GitHub profile and repositories after the Morfos deletion.
- [x] Ensure the deleted Morfos repository is absent and the AXON OS repository is represented accurately.
- [x] Rework the site into a left-to-right horizontal presentation on desktop with clear section snap points.
- [x] Add horizontal progress/navigation controls, keyboard support, and a visible scroll affordance.
- [x] Add a user-controlled light/dark mode with white/light-gray/black light theme and inverted dark theme.
- [x] Update borders, text, cards, controls, and Pegasus treatment for both themes.
- [x] Improve project taxonomy and repository cards using the latest GitHub facts.
- [x] Add additional useful portfolio structure without fabricated testimonials or reviews.
- [x] Provide a readable vertical responsive fallback on narrow/mobile screens.
- [x] Verify desktop horizontal behavior, mobile fallback, theme toggle, GitHub links, TypeScript, build, and checkpoint.

## Style guardrails

- Keep the Ethereal Motion identity, but evolve it into a monochrome editorial gallery: white and pale gray in light mode, near-black and graphite in dark mode, with hard black/white outline logic and restrained gold only where it clarifies focus.
- The primary reading direction is left-to-right on desktop. Avoid vertical page stacking there; use horizontal panels, snap points, and deliberate navigation.
- Do not fabricate reviews, ratings, testimonials, or project outcomes. Use only GitHub-derived facts and clearly labeled portfolio positioning.
- Keep all project media outside the project directory and reference uploaded assets through webdev storage paths.

## Verification checklist

- [ ] Morfos is absent from all rendered content.
- [ ] AXON OS appears with accurate repository description and GitHub link.
- [ ] Desktop scroll progresses horizontally from left to right.
- [ ] Keyboard navigation and reduced-motion behavior work.
- [ ] Light and dark themes remain readable and visually inverted.
- [ ] Mobile uses a usable vertical fallback.
- [ ] No build or TypeScript errors remain.
- [ ] New checkpoint is created after final verification.
