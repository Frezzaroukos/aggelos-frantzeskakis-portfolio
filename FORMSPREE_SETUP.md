# Formspree setup

The contact form is ready to use Formspree when the project receives a public form endpoint. The frontend reads `VITE_FORMSPREE_ENDPOINT`; if it is absent, it safely falls back to opening the user's email client with a prefilled message.

To activate delivery, create a form in Formspree, copy the endpoint in the form `https://formspree.io/f/your-form-id`, and add it as a project secret/environment value named `VITE_FORMSPREE_ENDPOINT` through the project settings or local environment. Do not commit the endpoint or any API credentials to GitHub.

The static frontend currently supports these states: sending, successful Formspree delivery, failed delivery with direct-email fallback guidance, and mailto fallback when no endpoint is configured.

Telegram notifications and AXON module storage should be implemented later through a server-side webhook or the user's own AI/backend layer. Do not place a Telegram bot token in this frontend.
