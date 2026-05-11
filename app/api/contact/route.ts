import { NextResponse } from "next/server";
import { decryptWebhook } from "@/lib/webhook";

function invalidRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || name.length < 2 || name.length > 60) {
      return invalidRequest("Name must be between 2 and 60 characters.");
    }
    if (!email || email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return invalidRequest("Please provide a valid email address.");
    }
    if (!message || message.length < 10 || message.length > 1200) {
      return invalidRequest("Message must be between 10 and 1200 characters.");
    }

    const encryptedWebhook = process.env.DISCORD_WEBHOOK_ENCRYPTED;
    const webhookSecret = process.env.DISCORD_WEBHOOK_SECRET;

    if (!encryptedWebhook || !webhookSecret) {
      return invalidRequest("Webhook is not configured.", 500);
    }

    const webhookUrl = decryptWebhook(encryptedWebhook, webhookSecret);

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "New Portfolio Contact Message",
            color: 0x111827,
            fields: [
              { name: "Name", value: name, inline: true },
              { name: "Email", value: email, inline: true },
              { name: "Message", value: message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      return invalidRequest("Failed to forward message.", 502);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return invalidRequest("Unexpected server error.", 500);
  }
}
