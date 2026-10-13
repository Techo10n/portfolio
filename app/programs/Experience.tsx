import type { ReactNode } from "react";
import { formatRange } from "@/lib/dates";

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

type Job = {
  title: string;
  org: string;
  place?: string;
  /** "YYYY-MM"; `end: null` means ongoing. */
  start: string;
  end: string | null;
  bullets: ReactNode[];
};

const experience: Job[] = [
  {
    title: "Software Engineering Intern",
    org: "Capital One",
    place: "McLean, VA",
    start: "2026-06",
    end: "2026-08",
    bullets: [
      "Built Tech Support, an AI-powered IT-support platform for Capital One's 80,000+ associates, targeting a 50% reduction in IT-support cycle time.",
      "Developed Capital One's first mobile AI solution on a new LangGraph-based multi-agent orchestration framework, collaborating across 5+ engineering teams through its production rollout.",
      "Owned support workflows end to end across Next.js, React, TypeScript, Swift, and AI backend services.",
      "Placed 3rd of 100+ interns in the intern hackathon with an AI data-loss prevention system spanning a Chrome extension, VS Code extension, CLI, and web dashboard.",
    ],
  },
  {
    title: "Freelance Web Designer & Developer",
    org: "Various Clients",
    place: "Remote",
    start: "2024-01",
    end: "2026-05",
    bullets: [
      "Built websites and software for local clients, generating over $4,000 in freelance revenue.",
      <>Redesigned a regional nonprofit&apos;s Squarespace site, increasing site visits by 150% (<Link href="https://cwjfon.org">cwjfon.org</Link>).</>,
      <>Tailored a WordPress site for a lawyer with a focus on UX and simple client contact (<Link href="https://askin4baskin.attorney">askin4baskin.attorney</Link>).</>,
      <>Launched a mobile-first Framer site for a local law office, boosting client inquiries by over 400% in three months (<Link href="https://web.archive.org/web/20250710234233/https://www.bluemountainlawoffice.com/">archived</Link>; the attorney has since moved firms).</>,
    ],
  },
  {
    title: "Frontend Web Developer",
    org: "BracketCS",
    place: "Remote",
    start: "2022-12",
    end: "2024-06",
    bullets: [
      <>Built the website for BracketCS&apos;s CerealCodes coding competition with Next.js and Tailwind CSS (<Link href="https://www.cerealcodes.org/">cerealcodes.org</Link>).</>,
      "Doubled participation to over 850 users, with $850 in prizes distributed via sponsorships.",
    ],
  },
  {
    title: "Energy Technology Intern",
    org: "Pacific Northwest National Laboratory",
    start: "2023-06",
    end: "2023-08",
    bullets: [
      "Compiled and analyzed datasets concerning US Army installations.",
      "Researched government documents and presented a symposium talk on garden bed irrigation optimization.",
    ],
  },
];

const education = [
  {
    school: "Georgia Institute of Technology",
    degree: "B.S. Computer Science, Minor in Korean",
    time: "Aug 2024 – May 2028",
    details: [
      ["School Year:", "Junior"],
      ["GPA:", "3.85"],
      ["Involvement:", "Big Data Big Impact (Digital Resources Manager), Korean Undergraduate Student Association (Social Media Manager)"],
      ["Relevant Courses:", "Artificial Intelligence, Combinatorics, Computer Organization and Programming, Data Structures & Algorithms, Linear Algebra, Multivariable Calculus, Object-Oriented Programming, Objects and Design"],
    ],
  },
  {
    school: "Whitman College",
    degree: "High School Enrichment Program",
    time: "Aug 2022 – May 2024",
    details: [
      ["GPA:", "4.0"],
      ["Relevant Courses:", "Data Structures, Software Performance Optimization, Discrete Math and Functional Programming, Databases"],
    ],
  },
];

const sectionLabel = "font-mono text-xs uppercase tracking-widest text-foreground/60";

export default function Experience() {
  return (
    <div className="w-full px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8 pb-10">
      <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">Experience</h1>

      <section aria-labelledby="work-heading" className="mt-6">
        <h2 id="work-heading" className={sectionLabel}>Work</h2>
        <ol className="mt-4">
          {experience.map((exp, idx, arr) => (
            <li key={exp.title} className="relative flex gap-4">
              {/* Timeline rail */}
              <div aria-hidden="true" className="flex flex-col items-center pt-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-foreground" />
                {idx !== arr.length - 1 && <span className="w-px flex-1 bg-foreground/30 mt-1" />}
              </div>
              <div className="pb-7 max-w-[70ch]">
                <h3 className="text-base font-semibold leading-snug">{exp.title}</h3>
                <p className="text-sm text-foreground/80">
                  {exp.org}
                  {exp.place ? ` · ${exp.place}` : ""}
                </p>
                <p className="font-mono text-xs text-foreground/65 mt-1">{formatRange(exp.start, exp.end)}</p>
                <ul className="list-disc pl-4 mt-2 space-y-1.5 text-[15px] leading-relaxed text-foreground/90 marker:text-foreground/40">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="education-heading" className="mt-2">
        <h2 id="education-heading" className={sectionLabel}>Education</h2>
        <div className="mt-4 space-y-6">
          {education.map((edu) => (
            <div key={edu.school} className="max-w-[70ch]">
              <h3 className="text-base font-semibold leading-snug">{edu.school}</h3>
              <p className="text-sm text-foreground/80">{edu.degree}</p>
              <p className="font-mono text-xs text-foreground/65 mt-1">{edu.time}</p>
              <dl className="mt-2 space-y-1 text-[15px] leading-relaxed">
                {edu.details.map(([label, value]) => (
                  <div key={label}>
                    <dt className="inline font-semibold">{label}</dt> <dd className="inline text-foreground/90">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
