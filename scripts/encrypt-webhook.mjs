#!/usr/bin/env node

import { createCipheriv, randomBytes, scryptSync } from "node:crypto";

const webhook = process.argv[2];
const secret = process.argv[3];

if (!webhook || !secret) {
  console.error("Usage: node scripts/encrypt-webhook.mjs <webhook-url> <secret>");
  process.exit(1);
}

if (!webhook.startsWith("https://")) {
  console.error("Webhook must be a valid https URL.");
  process.exit(1);
}

const iv = randomBytes(12);
const key = scryptSync(secret, "portfolio-discord-webhook", 32);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(webhook, "utf8"), cipher.final()]);
const authTag = cipher.getAuthTag();

const output = `${iv.toString("base64url")}:${authTag.toString("base64url")}:${encrypted.toString("base64url")}`;

console.log(output);
