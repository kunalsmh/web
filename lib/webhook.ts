import { createDecipheriv, scryptSync } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;

function deriveKey(secret: string) {
  return scryptSync(secret, "portfolio-discord-webhook", KEY_LENGTH);
}

export function decryptWebhook(encryptedValue: string, secret: string) {
  const [ivPart, authTagPart, cipherPart] = encryptedValue.split(":");

  if (!ivPart || !authTagPart || !cipherPart) {
    throw new Error("Encrypted webhook has invalid format");
  }

  const iv = Buffer.from(ivPart, "base64url");
  const authTag = Buffer.from(authTagPart, "base64url");
  const cipherText = Buffer.from(cipherPart, "base64url");

  const decipher = createDecipheriv(ALGORITHM, deriveKey(secret), iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(cipherText),
    decipher.final(),
  ]).toString("utf8");

  if (!decrypted.startsWith("https://")) {
    throw new Error("Decrypted webhook URL is invalid");
  }

  return decrypted;
}
