import type { Metadata } from "next";
import { SiteChrome } from "@/components/site-chrome";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact · Kunal Sharma",
};

export default function ContactPage() {
  return (
    <SiteChrome active="contact">
      <main className="mt-28 sm:mt-36">
        <h2 className="text-[1.875rem] font-light tracking-tight text-neutral-950 sm:text-[2.25rem]">
          Contact
        </h2>
        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-neutral-600 sm:text-lg">
          Have an idea, role, or project in mind? Send a message and I will reply
          by email.
        </p>
        <ContactForm />
      </main>
    </SiteChrome>
  );
}
