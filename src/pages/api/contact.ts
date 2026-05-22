export const prerender = false;
import type { APIRoute } from "astro";

interface Contact {
  fullName: string;
  email: string;
  engagementType: string;
  message: string;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email provider API key not configured.",
        }),
        { status: 500 },
      );
    }
    const data = (await request.json()) as Contact;

    const fullName = data.fullName?.trim();
    const email = data.email?.trim();
    const engagementType = data.engagementType?.trim();
    const message = data.message?.trim();

    if (!fullName || !email || !engagementType || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "All fields are required.",
        }),
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please enter a valid email address.",
        }),
        { status: 400 },
      );
    }

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeEngagementType = escapeHtml(engagementType);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Levein Website Contact Form",
          email: "itops@leveingroup.com",
        },
        to: [
          {
            email: "itops@leveingroup.com",
            name: "General Inquiry",
          },
        ],
        replyTo: {
          email,
          name: fullName,
        },
        subject: `New Contact Us Submission - ${engagementType}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
            <h2>New Contact Us Submission</h2>

            <p><strong>Full Name:</strong> ${safeFullName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Engagement Type:</strong> ${safeEngagementType}</p>

            <hr />

            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          </div>
        `,
      }),
    });

    const brevoResult = await brevoResponse.json();

    if (!brevoResponse.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email sending failed.",
          error: brevoResult,
        }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact form submitted successfully.",
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error. Please try again later.",
      }),
      { status: 500 },
    );
  }
};
