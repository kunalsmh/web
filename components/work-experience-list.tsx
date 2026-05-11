import Link from "next/link";
import {
  experienceArrowClass,
  experienceCompanyClass,
  experienceTitleClass,
  jobs,
} from "@/lib/site";

export function WorkExperienceList() {
  return (
    <section id="work" className="mt-28 space-y-10 sm:mt-36 sm:space-y-12">
      {jobs.map((job, index) => (
        <article
          key={job.company}
          className="group motion-safe:animate-appear-soft motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
          style={{
            animationDelay: `${160 + index * 95}ms`,
          }}
        >
          <h2 className="text-[1.875rem] font-light tracking-tight sm:text-[2.25rem]">
            {job.href ? (
              <Link
                href={job.href}
                className={`${experienceTitleClass} hover:text-link hover:decoration-link/40`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={experienceCompanyClass}>{job.company}</span>
                <span className={experienceArrowClass} aria-hidden>
                  ↗
                </span>
              </Link>
            ) : (
              <span className={`${experienceTitleClass} cursor-default`}>
                <span className={experienceCompanyClass}>{job.company}</span>
                <span className={experienceArrowClass} aria-hidden>
                  ↗
                </span>
              </span>
            )}
          </h2>
          <p className="mt-3 text-sm text-neutral-400">{job.meta}</p>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-neutral-800 sm:text-lg">
            {job.body}
          </p>
        </article>
      ))}
    </section>
  );
}
