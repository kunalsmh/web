"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Project {
  name: string;
  year: string;
  description: string;
  link: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
}

const PROJECTS: Project[] = [
  {
    name: "scapes.city",
    year: "2026",
    description: "Miniature city scape models on a budget.",
    link: "https://scapes.city",
  },
  {
    name: "ksh.ae (wip)",
    year: "2025",
    description: "Fully modular animatronic eyes.",
    link: "https://github.com/kunalsmh",
  },
];

const EXPERIENCE: Experience[] = [
  {
    role: "Backend Engineer",
    company: "St. Soldier Group",
    period: "2024-2025",
  },
  {
    role: "Software Engineer Intern",
    company: "The Body Shop",
    period: "Summer 2024",
  },
  {
    role: "Software Engineer",
    company: "Netcord",
    period: "2022-2023",
  },
];

export default function Work() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen p-8 md:p-24 bg-white text-black font-sans">
      <main className="max-w-3xl">
        <div className={`transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-transparent group-hover:border-black transition-colors">back home</span>
          </Link>
        </div>

        <div className={`transition-all duration-700 delay-100 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h1 className="text-2xl md:text-3xl font-patrick mb-8">Work & Projects</h1>
        </div>

        <div className="space-y-12">
          <section className={`transition-all duration-700 delay-200 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h2 className="text-xl font-bold mb-4">Selected Projects</h2>
            <div className="space-y-6">
              {PROJECTS.map((project, index) => (
                <div key={index} className="group">
                  <a href={project.link} className="block hover:opacity-80 transition-opacity">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {project.name}
                      <span className="text-sm font-normal text-gray-500">{project.year}</span>
                    </h3>
                    <p className="text-gray-700 mt-1">
                      {project.description}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className={`transition-all duration-700 delay-300 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            <div className="space-y-6">
               {EXPERIENCE.map((job, index) => (
                 <div key={index} className="group">
                    <h3 className="text-lg font-semibold">
                      {job.role} @ {job.company}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{job.period}</p>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
