import { Resend } from "resend"
import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact-schema"
import { createRateLimiter } from "@/lib/rate-limit"

const allow = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

// Resend's shared test sender only delivers to the Resend account owner's address.
// Set CONTACT_FROM to an address on a verified domain once one exists.
const FROM = process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>"
const TO = process.env.CONTACT_TO ?? "zechariahfrierson@gmail.com"

export async function POST(request: Request) {
  // Vercel sets x-forwarded-for at the edge; the first entry is the client.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (!allow(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { name, email, subject, message, website } = parsed.data

  // Honeypot filled: pretend it worked so bots don't learn to adapt.
  if (website) {
    return NextResponse.json({ success: true })
  }

  // Checked at request time, not module load, so a missing key can't crash the route.
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured")
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    // Plain text only: visitor input is never interpreted as HTML.
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n`,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
