import { Resend } from "resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // Check for API key at runtime
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured")
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Change this to your verified domain email
      to: "zechariahfrierson@gmail.com", // Your email address
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
