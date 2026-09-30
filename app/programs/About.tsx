import type { ReactNode } from "react";
import Image from "next/image";
import {
  BookOpen,
  Braces,
  Cloud,
  CodeXml,
  Coffee,
  Database,
  FileCode,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Palette,
} from "lucide-react";
import { Github, Instagram, Linkedin, Youtube } from "@/components/brand-icons";
import SimpleIcon from "@/components/SimpleIcon";
import { formatRange } from "@/lib/dates";

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const socials = [
  { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/zechariah-frierson/" },
  { icon: Github, label: "GitHub", link: "https://github.com/Techo10n" },
  { icon: Youtube, label: "YouTube", link: "https://www.youtube.com/@techolon" },
  { icon: Mail, label: "Email", link: "mailto:zechariahfrierson@gmail.com" },
  { icon: Instagram, label: "Instagram", link: "https://www.instagram.com/techolon_/" },
];

const tools = [
  { icon: FileCode, label: "TypeScript", link: "https://www.typescriptlang.org/" },
  { icon: CodeXml, label: "React", link: "https://react.dev/" },
  { icon: CodeXml, label: "Next.js", link: "https://nextjs.org/" },
  { icon: Palette, label: "Tailwind CSS", link: "https://tailwindcss.com/" },
  { icon: FileCode, label: "JavaScript", link: "https://developer.mozilla.org/docs/Web/JavaScript" },
  { icon: CodeXml, label: "Vite", link: "https://vite.dev/" },
  { icon: Braces, label: "Python", link: "https://www.python.org/" },
  { icon: Coffee, label: "Java", link: "https://dev.java/" },
  { icon: Braces, label: "C++", link: "https://isocpp.org/" },
  { icon: Database, label: "SQL", link: "https://en.wikipedia.org/wiki/SQL" },
  { icon: Database, label: "Supabase", link: "https://supabase.com/" },
  { icon: Database, label: "MongoDB", link: "https://www.mongodb.com/" },
  { icon: Cloud, label: "AWS", link: "https://aws.amazon.com/" },
  { icon: Cloud, label: "Vercel", link: "https://vercel.com/" },
  { icon: GitBranch, label: "Git", link: "https://git-scm.com/" },
  { icon: Palette, label: "Figma", link: "https://www.figma.com/" },
];

type Experience = {
  title: string;
  org: string;
  place?: string;
  /** "YYYY-MM"; `end: null` means ongoing. */
  start: string;
  end: string | null;
  bullets: ReactNode[];
};

const experience: Experience[] = [
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
      <>Launched a mobile-first Framer site for a local law office, boosting client inquiries by over 400% in three months (<Link href="https://bluemountainlawoffice.com">bluemountainlawoffice.com</Link>).</>,
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
    icon: <GraduationCap className="w-5 h-5 @xl:w-6 @xl:h-6 stroke-1" />,
    school: "Georgia Institute of Technology",
    degree: "B.S. Computer Science, Minor in Korean",
    time: "Aug 2024 – May 2028",
    details: [
      ["School Year:", "Junior"],
      ["GPA:", "3.85"],
      ["Involvement:", "Big Data Big Impact (Digital Resources Manager)"],
      ["Relevant Courses:", "Artificial Intelligence, Combinatorics, Computer Organization and Programming, Data Structures & Algorithms, Linear Algebra, Multivariable Calculus, Object-Oriented Programming, Objects and Design"],
    ],
  },
  {
    icon: <BookOpen className="w-4 h-4 @xl:w-5 @xl:h-5 stroke-1 mt-0.5 mr-1" />,
    school: "Whitman College",
    degree: "High School Enrichment Program",
    time: "Aug 2022 – May 2024",
    details: [
      ["GPA:", "4.0"],
      ["Relevant Courses:", "Data Structures, Software Performance Optimization, Discrete Math and Functional Programming, Databases"],
    ],
  },
];

export default function About() {
  return (
    <div className="w-full pb-8">
      <div className="flex flex-col justify-center items-start w-full h-full px-4 @xl:px-8 @3xl:px-14 py-4 @xl:py-6 @3xl:py-8">
        {/* Profile Section - Stack on mobile, side by side on larger screens */}
        <div className="flex flex-col @xl:flex-row items-center @xl:items-start justify-start w-full gap-4 @xl:gap-0">
          <Image
            src="/pfp.jpg"
            alt="Zechariah Frierson"
            width={200}
            height={200}
            className="w-[120px] h-[120px] @xl:w-[150px] @xl:h-[150px] @3xl:w-[200px] @3xl:h-[200px] object-cover rounded-full border border-foreground/50 flex-shrink-0"
          />
          <div className="flex flex-col items-center @xl:items-start justify-center w-full @xl:h-[150px] @3xl:h-[200px] @xl:pl-6 text-center @xl:text-left">
            <h1 className="text-foreground text-xl @xl:text-2xl @3xl:text-3xl font-extrabold">
              Zechariah Frierson
            </h1>
            <h2 className="text-foreground text-sm @xl:text-base @3xl:text-lg">
              Full Stack Web Developer & Designer
            </h2>
            <span className="text-foreground text-xs @xl:text-sm mt-2">
              <MapPin className="inline-block w-3 h-3 @xl:w-4 @xl:h-4 mr-1 @xl:mr-2 stroke-1" />
              Atlanta, GA | United States
            </span>
            <div className="flex flex-row items-center justify-center @xl:justify-start gap-2 @xl:gap-2.5 mt-3 @xl:mt-4">
              {socials.map(({ icon: Icon, label, link }, index) => (
              <a
                key={index}
                href={link}
                aria-label={label}
                className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center w-7 h-7 @xl:w-8 @xl:h-8 border border-foreground/50 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-4 h-4 @xl:w-5 @xl:h-5 text-foreground stroke-1.5" />
              </a>
              ))}
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="w-full h-px bg-foreground/50 mt-6 @xl:mt-8 @3xl:mt-10"></div>

        <div className="w-full mt-4 text-foreground text-xs @xl:text-sm">
          <p className="mb-3 @xl:mb-4">
            Hey, I&apos;m Zechariah, often known as Zach or &ldquo;Zech,&rdquo; and I&apos;m a junior at Georgia Tech in Atlanta, studying computer science with a minor in Korean. Most recently I was a software engineering intern at Capital One. I am extremely passionate about computer programming, along with video editing and web design.
          </p>
          <p className="mb-3 @xl:mb-4">
            Alongside my STEM interests, I also enjoy soccer, volleyball, and music.
          </p>
          <p>
            I am obsessed with seeing my work come to life before my eyes, and I dream of working in a field that allows me to create something out of nothing.
          </p>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col items-start justify-start w-full mt-4 @xl:mt-6">
          <h3 className="text-foreground text-base @xl:text-lg font-extrabold">
              What I Work With
          </h3>
          <div className="flex flex-row flex-wrap gap-2 @xl:gap-3 mt-2">
            {tools.map(({ icon, label, link }, index) => (
              <SimpleIcon key={index} icon={icon} label={label} link={link} />
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="flex flex-col items-start justify-start w-full mt-4 @xl:mt-6">
          <h3 className="text-foreground text-base @xl:text-lg font-extrabold">Experience</h3>
          <div className="flex flex-col w-full mt-2 relative">
            {experience.map((exp, idx, arr) => (
              <div key={idx} className="flex w-full relative">
                <div className="flex flex-col items-center mr-3 @xl:mr-4">
                  <div className="w-2.5 h-2.5 @xl:w-3 @xl:h-3 rounded-full bg-foreground mt-1" />
                  {idx !== arr.length - 1 && (
                    <div className="w-[2px] flex-1 bg-foreground -mb-1" />
                  )}
                </div>
                <div className="pb-4 @xl:pb-6">
                  <h4 className="text-foreground text-sm @xl:text-md font-bold">{exp.title}</h4>
                  <p className="text-foreground text-xs @xl:text-sm">{exp.org}{exp.place ? ` · ${exp.place}` : ""}</p>
                  <p className="text-foreground/75 text-[10px] @xl:text-xs pt-1">{formatRange(exp.start, exp.end)}</p>
                  <ul className="list-disc list-inside text-foreground text-xs @xl:text-sm pt-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className={i !== 0 ? "pt-1 @xl:pt-1.5" : ""}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="flex flex-col items-start justify-start w-full">
          <h3 className="text-foreground text-base @xl:text-lg font-extrabold">Education</h3>
          <div className="flex flex-col w-full mt-2">
            {education.map((edu, idx) => (
              <div key={idx} className={`flex flex-row items-start justify-start w-full ${idx > 0 ? "pt-4 @xl:pt-6" : ""}`}>
                {/* Icon */}
                <div className="flex flex-col items-center pr-2">
                  {edu.icon}
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start justify-start">
                  <h4 className="text-foreground text-sm @xl:text-md font-bold">{edu.school}</h4>
                  <p className="text-foreground text-xs @xl:text-sm">{edu.degree}</p>
                  <p className="text-foreground/75 text-[10px] @xl:text-xs pt-1">{edu.time}</p>
                  <div className="list-disc list-inside text-foreground text-xs @xl:text-sm pt-1 space-y-1 @xl:space-y-1.5">
                    {edu.details.map(([label, value], i) => (
                      <span key={i} className="text-foreground text-xs @xl:text-sm block">
                        <span className="font-bold">{label}</span> {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
