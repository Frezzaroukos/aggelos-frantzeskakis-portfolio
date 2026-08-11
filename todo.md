# Pegasus Portfolio Motion Upgrade TODO

- [x] Audit current panel navigation, scroll snapping, wheel conversion, and active-panel state.
- [x] Define a restrained cinematic transition language for panel entry and exit.
- [x] Add smooth horizontal scroll easing and richer navigation transitions.
- [x] Add panel-aware parallax for backgrounds, typography, Pegasus/visual layers, and cards.
- [x] Add active-panel progress and directional transition states without layout jank.
- [x] Preserve a readable mobile vertical fallback and respect prefers-reduced-motion.
- [x] Verify desktop transitions, keyboard navigation, theme compatibility, mobile fallback, TypeScript, and production build.
- [ ] Save a new checkpoint after visual verification.

## Motion guardrails

- Motion should feel like an editorial gallery flight: calm, weighted, and directional rather than flashy.
- Use transform and opacity for performance; avoid animating layout dimensions.
- Keep controls responsive and keyboard navigation immediate enough to remain usable.
- Do not add distracting perpetual effects or motion that competes with the Pegasus artwork.
