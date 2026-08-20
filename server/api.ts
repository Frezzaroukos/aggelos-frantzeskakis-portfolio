import type { Express, Request, Response } from "express";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

type ApiResult = {
  status: number;
  body: Record<string, unknown>;
};

/**
 * Shared contact boundary used by both the standalone Express server and the
 * Vite development middleware. Keeping validation here prevents the frontend
 * and the two server entry points from drifting apart.
 */
export async function processContactSubmission(payload: unknown, userAgent = "unknown"): Promise<ApiResult> {
  try {
    const { name, email, subject, message } = (payload ?? {}) as ContactPayload;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return { status: 400, body: { error: "Invalid or missing name (minimum 2 characters required)." } };
    }
    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return { status: 400, body: { error: "Invalid or missing email address." } };
    }
    if (!message || typeof message !== "string" || message.trim().length < 8) {
      return { status: 400, body: { error: "Message must be at least 8 characters long." } };
    }

    const submission = {
      name: name.trim(),
      email: email.trim(),
      subject: typeof subject === "string" && subject.trim() ? subject.trim() : "Portfolio Contact",
      message: message.trim(),
      timestamp: new Date().toISOString(),
      userAgent,
    };

    const formspreeEndpoint = process.env.VITE_FORMSPREE_ENDPOINT || process.env.FORMSPREE_ENDPOINT;
    let forwarded = false;
    if (formspreeEndpoint) {
      try {
        const response = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(submission),
        });
        forwarded = response.ok;
        if (!response.ok) console.warn("[Backend] Formspree remote forward returned non-OK status:", response.status);
      } catch (error) {
        console.warn("[Backend] Failed to forward submission to Formspree endpoint:", error);
      }
    }

    return {
      status: 200,
      body: {
        success: true,
        forwarded,
        message: "Contact submission received and processed securely.",
        receivedAt: submission.timestamp,
      },
    };
  } catch (error) {
    console.error("[Backend] Contact API error:", error);
    return { status: 500, body: { error: "Internal server error processing contact submission." } };
  }
}

export function registerApiRoutes(app: Express) {
  app.post("/api/contact", async (req: Request, res: Response) => {
    const result = await processContactSubmission(req.body, String(req.headers["user-agent"] || "unknown"));
    return res.status(result.status).json(result.body);
  });

  app.get("/api/health", (_req: Request, res: Response) => {
    return res.json({ status: "healthy", timestamp: new Date().toISOString(), service: "portfolio-backend" });
  });
}

export type { ApiResult };
