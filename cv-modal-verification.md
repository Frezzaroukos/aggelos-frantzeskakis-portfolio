# CV Modal and Loader Verification

The CV preview flow now opens a branded modal before any download. The modal contains a document-style factual preview, a visible note that the current CV is a draft, an email action for confirming missing facts, a close/keep-browsing action, and an explicit PDF download action. Escape closes the modal and body scrolling is restored on unmount.

The preloader now uses a custom AF monogram instead of the previous brand image tile, a gold orbit line, a restrained flight layer, progress copy, percentage state, and motion that collapses under reduced-motion preferences. The visual language is now closer to the main portfolio rather than a generic loading screen.

Desktop and iPhone-sized full-page screenshots remain readable and no horizontal overflow was introduced. TypeScript and production build passed; the only remaining build advisory is the existing Vite chunk-size warning. The Formspree endpoint is still configurable but cannot be truly activated until a real endpoint or form ID is supplied.
