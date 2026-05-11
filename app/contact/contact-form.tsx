"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const COOLDOWN_MS = 30 * 60 * 1000;
const COOLDOWN_STORAGE_KEY = "portfolio-contact-cooldown-until";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const stored = window.localStorage.getItem(COOLDOWN_STORAGE_KEY);
    if (!stored) return;
    const parsed = Number(stored);
    if (Number.isNaN(parsed) || parsed <= Date.now()) {
      window.localStorage.removeItem(COOLDOWN_STORAGE_KEY);
      return;
    }
    setCooldownUntil(parsed);
  }, []);

  useEffect(() => {
    if (!cooldownUntil) return;
    const interval = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      if (currentTime >= cooldownUntil) {
        setCooldownUntil(null);
        window.localStorage.removeItem(COOLDOWN_STORAGE_KEY);
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [cooldownUntil]);

  const cooldownRemaining = useMemo(() => {
    if (!cooldownUntil) return 0;
    return Math.max(cooldownUntil - now, 0);
  }, [cooldownUntil, now]);

  const cooldownLabel = useMemo(() => {
    if (!cooldownRemaining) return "";
    const totalSeconds = Math.ceil(cooldownRemaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, [cooldownRemaining]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cooldownUntil && Date.now() < cooldownUntil) {
      setStatus("error");
      setMessage(`Please wait ${cooldownLabel} before sending again.`);
      return;
    }
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      const nextCooldown = Date.now() + COOLDOWN_MS;
      setCooldownUntil(nextCooldown);
      window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(nextCooldown));
      setStatus("success");
      setMessage("Message sent. You can send another one in 30 minutes.");
    } catch {
      setStatus("error");
      setMessage("Could not send message right now. Please try again.");
    }
  }

  const isCooldownActive = Boolean(cooldownUntil && now < cooldownUntil);
  const isSubmitting = status === "submitting";
  const isDisabled = isSubmitting || isCooldownActive;

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-xl space-y-5 rounded-2xl border border-neutral-200/70 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-neutral-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          maxLength={60}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-neutral-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={120}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-neutral-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={1200}
          rows={6}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
          placeholder="Tell me about your project..."
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Sending..."
            : isCooldownActive
              ? `Cooldown ${cooldownLabel}`
              : "Send message"}
        </button>
        <p
          aria-live="polite"
          className={`text-sm transition-opacity duration-200 ${
            message ? "opacity-100" : "opacity-0"
          } ${status === "error" ? "text-red-600" : "text-neutral-600"}`}
        >
          {message || "Status updates appear here."}
        </p>
      </div>
    </form>
  );
}
