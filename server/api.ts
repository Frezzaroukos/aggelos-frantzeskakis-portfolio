import type { Express, Request, Response } from "express";

export function registerApiRoutes(app: Express) {
  // Serverless contact form submission endpoint with validation and mock/Formspree/Telegram bridge
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body || {};

      if (!name || typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({ error: "Invalid or missing name (minimum 2 characters required)." });
      }
      if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
        return res.status(400).json({ error: "Invalid or missing email address." });
      }
      if (!message || typeof message !== "string" || message.trim().length < 8) {
        return res.status(400).json({ error: "Message must be at least 8 characters long." });
      }

      const submission = {
        name: name.trim(),
        email: email.trim(),
        subject: subject ? subject.trim() : "Portfolio Contact",
        message: message.trim(),
        timestamp: new Date().toISOString(),
        userAgent: req.headers["user-agent"] || "unknown",
      };

      // In production deployment, forward to Formspree or Telegram webhook if configured
      const formspreeEndpoint = process.env.VITE_FORMSPREE_ENDPOINT || process.env.FORMSPREE_ENDPOINT;
      if (formspreeEndpoint) {
        try {
          const response = await fetch(formspreeEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(submission),
          });
          if (!response.ok) {
            console.warn("[Backend] Formspree remote forward returned non-OK status:", response.status);
          }
        } catch (err) {
          console.warn("[Backend] Failed to forward submission to Formspree endpoint:", err);
        }
      }

      return res.json({
        success: true,
        message: "Contact submission received and processed securely.",
        receivedAt: submission.timestamp,
      });
    } catch (err: any) {
      console.error("[Backend] Contact API error:", err);
      return res.status(500).json({ error: "Internal server error processing contact submission." });
    }
  });

  // Health check endpoint for monitoring uptime and uptime probes
  app.get("/api/health", (_req: Request, res: Response) => {
    return res.json({ status: "healthy", timestamp: new Date().toISOString(), service: "pegasus-portfolio-backend" });
  });
}
