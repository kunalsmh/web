import type { Metadata } from "next";
import { SiteChrome } from "@/components/site-chrome";
import { WorkExperienceList } from "@/components/work-experience-list";

export const metadata: Metadata = {
  title: "Kunal Sharma",
};

export default function Home() {
  return (
    <SiteChrome active="work">
      <main>
        <WorkExperienceList />
      </main>
    </SiteChrome>
  );
}
