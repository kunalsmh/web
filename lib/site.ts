/** Shaghgred content + link styling for the portfolio shell and work list */

export type Job = {
  company: string;
  meta: string;
  body: string;
  href?: string;
};

export const social = [
  { label: "X/Twitter", href: "https://x.com/kunalsmh" },
  { label: "Instagram", href: "https://instagram.com/kunalsmh" },
  { label: "Email", href: "mailto:legal@kunalsh@gmail.com" },
] as const;

export const jobs = [
  {
    company: "The Body Shop",
    href: "https://www.thebodyshop.com/",
    meta: "2025 - 2026 · Backend Engineer",
    body:
      "Developed backend APIs, managed databases, resolved server-side issues, and maintained reliable, scalable performance across the systems.",
  },
  {
    company: "LPU",
    href: "https://www.lpu.in/",
    meta: "2023 - 2024 · Frontend Engineer",
    body:
      "Built responsive interfaces, improving performance, and supporting scalable frontend development across internal systems.",
  },
  {
    company: "Forest Essentials",
    meta: "2023 - 2024 · Backend Engineer",
    body:
      "Handled database syncing between regional platforms and worked on backend systems, integrations, and internal infrastructure.",
  },
] satisfies Job[];

export const linkClass =
  "underline decoration-1 underline-offset-[5px] transition-opacity hover:opacity-70";

const experienceUnderline =
  "underline decoration-1 underline-offset-[5px] decoration-neutral-950/35 transition-[color,decoration-color] duration-300 ease-out";

/** Title row: shifts slightly + turns link-blue when `.group` (article) is hovered */
export const experienceTitleClass = `${experienceUnderline} inline-flex flex-wrap items-baseline gap-0 text-neutral-950 transition-[color,gap,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-colors motion-reduce:transform-none group-hover:gap-2.5 group-hover:text-link group-hover:decoration-link/40 group-hover:-translate-y-px`;

/** Company name: gentle slide right on row hover */
export const experienceCompanyClass =
  "inline-block transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1 motion-reduce:transform-none";

/** ↗ reveals + springs up-right when `.group` is hovered */
export const experienceArrowClass =
  "inline-block origin-[90%_70%] text-[0.9em] leading-none text-link transition-[max-width,transform,opacity] duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none max-w-0 translate-y-0.5 -translate-x-1 overflow-hidden opacity-0 group-hover:max-w-[2ch] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:opacity-100";
