import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/schema";
import { site } from "@/data/site";

/**
 * The hero card submits a subset of the contact form, so the message and email
 * fields are optional at the boundary and filled in with placeholders below.
 */
const payloadSchema = contactSchema
  .partial({ email: true, message: true })
  .transform((value) => ({
    ...value,
    email: value.email || "not provided",
    message: value.message || "Callback requested from the home page hero.",
  }));

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request body." },
      { status: 400 },
    );
  }

  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields and try again.",
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot hit — accept silently so bots get no signal.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = parsed.data;

  // ---------------------------------------------------------------------
  // TODO: connect an email provider.
  //
  // Nothing is delivered anywhere yet — enquiries are logged and dropped.
  // Pick ONE of the two options below, add the credentials to `.env.local`
  // (see `.env.example`), and delete the placeholder log.
  //
  // Option A — Resend (recommended, no SMTP server needed):
  //   npm install resend
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: process.env.CONTACT_FROM_EMAIL!,   // must be a verified domain
  //     to: process.env.CONTACT_TO_EMAIL!,
  //     replyTo: enquiry.email,
  //     subject: `New ${enquiry.service} enquiry — ${enquiry.name}`,
  //     text: buildPlainTextBody(enquiry),
  //   });
  //
  // Option B — Nodemailer over SMTP (e.g. Gmail with an app password):
  //   npm install nodemailer
  //   import nodemailer from "nodemailer";
  //   const transport = nodemailer.createTransport({
  //     host: process.env.SMTP_HOST,
  //     port: Number(process.env.SMTP_PORT ?? 587),
  //     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  //   });
  //   await transport.sendMail({ ...same fields as above });
  //
  // Wrap whichever you choose in try/catch and return a 502 on failure so the
  // form shows its error state instead of a false success.
  // ---------------------------------------------------------------------
  process.stdout.write(
    `[contact] unsent enquiry for ${site.email}: ${JSON.stringify(enquiry)}\n`,
  );

  return NextResponse.json({ ok: true });
}
