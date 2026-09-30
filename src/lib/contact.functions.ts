import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  projectType: z.enum(["Photo & Video", "Mapping", "3D", "Other"]),
  message: z.string().trim().min(1).max(5000),
  lang: z.enum(["bg", "en"]),
  token: z.string().min(1).max(4096),
});

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const turnstileSecret = process.env["TURNSTILE_SECRET_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    if (!turnstileSecret || !resendKey) {
      return { ok: false as const, code: "not_configured" as const };
    }

    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: turnstileSecret, response: data.token }),
    });
    const vr = (await verify.json()) as { success?: boolean };
    if (!vr.success) return { ok: false as const, code: "captcha" as const };

    const rows: [string, string][] = [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone || "—"],
      ["Company", data.company || "—"],
      ["Project Type", data.projectType],
      ["Language", data.lang === "bg" ? "Bulgarian" : "English"],
    ];
    const html = `<h2>New AirProPix Website Inquiry</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`)
      .join("")}</table><p><b>Message</b></p><p style="white-space:pre-wrap">${esc(data.message)}</p>`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${data.message}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env["CONTACT_FROM_EMAIL"] || "AirProPix Website <onboarding@resend.dev>",
        to: ["contact@airpropix.com"],
        reply_to: data.email,
        subject: "New AirProPix Website Inquiry",
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return { ok: false as const, code: "send" as const };
    }
    return { ok: true as const };
  });
