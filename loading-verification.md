# Loading and Contact Verification

The desktop and iPhone-sized previews render the light-only vertical portfolio after the initial cinematic loading state completes. The Pegasus and AF assets resolve correctly through the Manus storage redirect and return image content. The first-load sequence uses a bounded preload wait, a visible progress line, a restrained AF/flight composition, and reduced-motion timing.

The contact form now supports a configurable Formspree endpoint with sending, success, and error states. Because no real Formspree endpoint has been supplied yet, the current verified fallback opens a prefilled email to aggelosf2016@gmail.com. The Formspree setup is documented separately, and Telegram/AXON storage remains intentionally server-side for a future AI-managed module.

Metadata was updated from horizontal to vertical language, the viewport no longer disables zoom, and the browser is explicitly light-only. TypeScript and production build passed; Vite still reports a non-blocking bundle-size advisory.
