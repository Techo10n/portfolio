import Image from "next/image";
import { ArrowRight, BriefcaseBusiness, FileText, Globe, Mail, MapPin, Music } from "lucide-react";
import { Github, Instagram, Linkedin, Youtube } from "@/components/brand-icons";
import OpenWindowButton from "@/components/desktop/OpenWindowButton";
import { site } from "@/lib/site";

const socials = [
  { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/zechariah-frierson/" },
  { icon: Github, label: "GitHub", link: "https://github.com/Techo10n" },
  { icon: Mail, label: "Email", link: "mailto:zechariahfrierson@gmail.com" },
  { icon: Youtube, label: "YouTube", link: "https://www.youtube.com/@techolon" },
  { icon: Instagram, label: "Instagram", link: "https://www.instagram.com/techolon_/" },
];

// Straight from the resume.
const skills: [string, string[]][] = [
  ["Languages", ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"]],
  ["Frameworks", ["React", "Next.js", "React Native", "Tailwind CSS", "Vite"]],
  ["Platforms", ["AWS", "Supabase", "MongoDB", "Vercel", "Git", "Figma"]],
  ["AI tools", ["Claude Code", "Codex", "GitHub Copilot", "CodeRabbit", "MCP"]],
];

const highlights = [
  {
    icon: BriefcaseBusiness,
    title: "Software Engineering Intern, Capital One",
    body: "Summer 2026. Built Tech Support, an AI-powered IT-support platform for Capital One's 80,000+ associates, targeting a 50% cut in support cycle time.",
    window: "experience" as const,
  },
  {
    icon: Music,
    title: "Museaic",
    body: "Cross-platform playlist sharing across Spotify, Apple Music, and YouTube Music. TestFlight beta with 20+ users.",
    window: "projects" as const,
  },
  {
    icon: Globe,
    title: "Freelance Web Designer & Developer",
    body: "Sites and software for local clients since 2024: over $4,000 in revenue and a 400% increase in inquiries in three months for a local law office.",
    window: "experience" as const,
  },
];

const sectionLabel = "font-mono text-xs uppercase tracking-widest text-foreground/60";
const primaryButton =
  "inline-flex items-center gap-2 h-9 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity";
const secondaryButton =
  "inline-flex items-center gap-2 h-9 px-4 rounded-full border border-foreground/25 text-sm font-medium hover:bg-foreground/8 transition-colors";

export default function About() {
  return (
    <div className="w-full px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8 pb-10">
      {/* Who, what, where — and the three things a visitor most likely wants next. */}
      <div className="flex flex-col @xl:flex-row items-center @xl:items-start gap-5 @xl:gap-7">
        <Image
          src="/pfp.jpg"
          alt="Zechariah Frierson"
          width={128}
          height={128}
          priority
          className="w-24 h-24 @xl:w-28 @xl:h-28 object-cover rounded-full border border-foreground/20 shrink-0"
        />
        <div className="flex flex-col items-center @xl:items-start text-center @xl:text-left">
          <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">{site.name}</h1>
          <p className="text-lg @xl:text-xl font-medium mt-1">{site.tagline}</p>
          <p className="text-sm text-foreground/75 mt-0.5">{site.education}</p>
          <p className="flex items-center gap-1.5 text-sm text-foreground/75 mt-1">
            <MapPin aria-hidden="true" className="w-3.5 h-3.5" />
            Atlanta, GA
          </p>
          <ul className="flex items-center gap-1 mt-3 -ml-1.5">
            {socials.map(({ icon: Icon, label, link }) => (
              <li key={label}>
                <a
                  href={link}
                  aria-label={label}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-foreground/8 transition-colors"
                >
                  <Icon aria-hidden="true" className="w-[18px] h-[18px] stroke-[1.5]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap justify-center @xl:justify-start gap-2.5 mt-6">
        <OpenWindowButton window="projects" className={primaryButton}>
          View projects <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </OpenWindowButton>
        <OpenWindowButton window="resume" className={secondaryButton}>
          <FileText aria-hidden="true" className="w-4 h-4" /> Resume
        </OpenWindowButton>
        <OpenWindowButton window="contact" className={secondaryButton}>
          <Mail aria-hidden="true" className="w-4 h-4" /> Get in touch
        </OpenWindowButton>
      </div>

      <section aria-labelledby="highlights-heading" className="mt-9">
        <h2 id="highlights-heading" className={sectionLabel}>Highlights</h2>
        <ul className="grid grid-cols-1 @3xl:grid-cols-3 gap-3 mt-3">
          {highlights.map(({ icon: Icon, title, body, window }) => (
            <li key={title}>
              <OpenWindowButton
                window={window}
                className="group flex flex-col h-full rounded-xl border border-foreground/15 bg-foreground/[0.03] p-4 hover:border-foreground/35 hover:bg-foreground/[0.06] transition-colors"
              >
                <Icon aria-hidden="true" className="w-5 h-5 stroke-[1.5] text-foreground/80" />
                <span className="text-[15px] font-semibold leading-snug mt-2.5">{title}</span>
                <span className="text-sm leading-relaxed text-foreground/75 mt-1">{body}</span>
              </OpenWindowButton>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-heading" className="mt-9">
        <h2 id="about-heading" className={sectionLabel}>About me</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
          Hey, I&apos;m Zechariah, and I&apos;m currently studying computer science at Georgia Institute of Technology
          in Atlanta. My primary interests lie in software development, video editing, and web design. I love bringing
          ideas to life, whether through interactive websites, polished videos, or elegant code.
        </p>
      </section>

      <section aria-labelledby="skills-heading" className="mt-9">
        <h2 id="skills-heading" className={sectionLabel}>Skills</h2>
        <dl className="mt-3 space-y-3">
          {skills.map(([group, items]) => (
            <div key={group} className="flex flex-col @xl:flex-row gap-1.5 @xl:gap-4">
              <dt className="font-mono text-xs text-foreground/65 @xl:w-24 shrink-0 pt-1.5">{group}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="rounded-md border border-foreground/15 px-2 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
