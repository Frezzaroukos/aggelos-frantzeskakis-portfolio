# Aggelos Portfolio Interoperability Audit TODO

- [x] Reproduce wheel, trackpad, scrollbar, drag, touch swipe, Arrow keys, navigation buttons, rail clicks, and mobile menu navigation.
- [x] Inspect the computed overflow, dimensions, scrollWidth/clientWidth, pointer-events, touch-action, and snap geometry on the gallery.
- [x] Check for event handlers that cancel native scroll or fight smooth scrolling.
- [x] Audit hidden overlays, fixed rails, grain layers, forms, dialogs, and pointer capture for interaction blocking.
- [x] Replace brittle navigation logic with a deterministic cross-device strategy.
- [x] Ensure mobile uses native vertical scroll without desktop horizontal handlers interfering.
- [x] Test theme toggle, project dialogs, filters, skills tabs, copy action, contact form, keyboard focus, and Escape behavior.
- [x] Run TypeScript, production build, desktop/tablet/mobile screenshots, and interaction regression checks.
- [ ] Save a new stable checkpoint and report every confirmed issue and fix.
