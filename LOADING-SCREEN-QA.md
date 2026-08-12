# Cinematic Loading Screen QA

The initial loading experience now uses the Pegasus as the main visual event instead of a secondary background image. The stage is composed from a softly masked Pegasus reveal, an outer gold orbit, an inner ivory orbit, a fine flight trace, a dark graphite field, a restrained grid, and a small flight-path telemetry line. The center carries the AF monogram, Aggelos wordmark, progress bar, and loading status.

The loader preserves the existing preload contract: the Pegasus asset and document fonts are awaited with a bounded timeout, progress advances until the asset boundary is ready, and the overlay exits smoothly into the portfolio. Asset errors resolve safely so the page does not remain blocked. Reduced-motion mode removes the continuous stage choreography and shortens the exit transition while preserving the status and progress information.

A real initial-navigation preview was checked at desktop size. The cinematic scene appears before the page content, the Pegasus enters from a slightly offset position, the rings remain visible around it, and the final state reaches 100% before opening the portfolio. The default portfolio preview remains light after the loader exits.
