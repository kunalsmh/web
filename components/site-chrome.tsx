import type { ReactNode } from "react";
import Link from "next/link";
import { linkClass, social } from "@/lib/site";

export type SiteNav = "work" | "contact";

export function SiteChrome({
  active,
  children,
}: {
  active: SiteNav;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[#f8f9fa]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-90 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 85% -10%, rgba(255, 255, 255, 0.95) 0%, transparent 58%), radial-gradient(ellipse 50% 40% at 50% -5%, rgba(255, 255, 255, 0.6) 0%, transparent 50%)",
        }}
      />

      <div
        className="relative mx-auto max-w-5xl px-8 pb-28 pt-20 motion-safe:animate-appear motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
      >
        <header className="flex flex-col gap-14 sm:flex-row sm:justify-between sm:gap-10">
          <div className="max-w-xl space-y-5">
            <h1 className="text-[2.65rem] font-light tracking-tight text-neutral-950 sm:text-6xl">
              <Link href="/" className="hover:opacity-80">
                Kunal Sharma
              </Link>
            </h1>
            <p className="leading-relaxed text-[16px] text-neutral-600">
              I build software and experiment with ideas, documenting the work along
              the way. Always open to working on projects.
            </p>
            <p className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] text-neutral-800">
              {social.map((item) => {
                const openInNewTab = item.href.startsWith("http");
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${linkClass} inline-flex items-center gap-1`}
                    {...(openInNewTab
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    <span>{item.label}</span>
                    <span className="translate-y-[0.5px] text-[0.75rem] opacity-75">
                      ↗
                    </span>
                  </Link>
                );
              })}
            </p>
          </div>

          <nav className="shrink-0 sm:pt-1" aria-label="Primary">
            <ul className="list-inside space-y-1.5 sm:list-outside sm:text-right">
              <li
                className={
                  active === "work"
                    ? "text-link marker:text-link"
                    : "marker:text-neutral-950"
                }
              >
                <Link
                  href="/"
                  className={`${linkClass} ${
                    active === "work" ? "text-link" : "text-neutral-950"
                  }`}
                >
                  Work
                </Link>
              </li>
              <li
                className={
                  active === "contact"
                    ? "text-link marker:text-link"
                    : "marker:text-neutral-950"
                }
              >
                <Link
                  href="/contact"
                  className={`${linkClass} ${
                    active === "contact" ? "text-link" : "text-neutral-950"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {children}

        <footer className="mt-36 text-xs text-neutral-400">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              Kunal Sharma © {new Date().getFullYear()}
            </span>
            <span aria-hidden className="text-neutral-500">
              ·
            </span>
            <span>
              Designed by{" "}
              <Link
                href="https://x.com/funnydusto"
                className="underline decoration-1 underline-offset-2 transition-opacity hover:opacity-80"
                target="_blank"
                rel="noreferrer noopener"
              >
                funnydusto
              </Link>
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
