import Image from "next/image";
import {
  BookOpen,
  Braces,
  Code2,
  Coffee,
  Database,
  FileCode2,
  GraduationCap,
  Mail,
  MapPin,
  Palette,
  Server,
} from "lucide-react";
import { Github, Instagram, Linkedin, Youtube } from "@/components/brand-icons";
import SimpleIcon from "@/components/SimpleIcon";

export default function About() {
  const socials = [
    { icon: Linkedin, label: 'LinkedIn', link: 'https://www.linkedin.com/in/zechariah-frierson/' },
    { icon: Github, label: 'GitHub', link: 'https://github.com/Techo10n' },
    { icon: Youtube, label: 'YouTube', link: 'https://www.youtube.com/@techolon' },
    { icon: Mail, label: 'Email', link: 'mailto:zechariahfrierson@gmail.com' },
    { icon: Instagram, label: 'Instagram', link: 'https://www.instagram.com/techolon_/' },
  ];

  const tools = [
    { icon: Code2, label: "React", link: "https://reactjs.org/" },
    { icon: Code2, label: "Next.js", link: "https://nextjs.org/" },
    { icon: Palette, label: "Tailwind CSS", link: "https://tailwindcss.com/" },
    { icon: FileCode2, label: "TypeScript", link: "https://www.typescriptlang.org/" },
    { icon: Braces, label: "JavaScript", link: "https://www.javascript.com/" },
    { icon: Server, label: "Express", link: "https://expressjs.com/" },
    { icon: Database, label: "MongoDB", link: "https://www.mongodb.com/" },
    { icon: Coffee, label: "Java", link: "https://www.java.com/" },
    { icon: Braces, label: "Python", link: "https://www.python.org/" },
    { icon: Palette, label: "Figma", link: "https://www.figma.com/" },
  ];


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
              Walla Walla, WA | United States
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
            Hey, I&apos;m Zechariah, often known as Zach or &ldquo;Zech,&rdquo; and I&apos;m a Sophomore at Georgia Institute of Technology in Atlanta. I am extremely passionate about computer programming, along with video editing and web design.
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
            {[
              {
                title: "Website Design Intern",
                org: "Central Washington Justice for Our Neighbors",
                time: "Jan 2024 - Present | 1 yr 5 mos",
                bullets: [
                  "Planning and designing a new website to promote CWJFON's programs, staff, and the advantages of partnering with the organization.",
                  "Learning how to use Framer, Figma, and a variety of other UI and UX programs to create an engaging website, using industry-standard design strategies, colors, and animations.",
                ],
              },
              {
                title: "Frontend Web Developer - CerealCodes",
                org: "BracketCS",
                time: "Dec 2022 - Jun 2024 | 1 yr 7 mos",
                bullets: [
                  "Working with a team of talented developers to create a clean, professional website for BracketCS's CerealCodes coding competition.",
                  "Using Next.js and Tailwind CSS to make the website the best it can be, implementing a variety of libraries for engaging functionality.",
                  "The CerealCodes website: https://www.cerealcodes.org/",
                ],
              },
              {
                title: "Energy Technology Intern",
                org: "Pacific Northwest National Laboratory",
                time: "Jun 2023 - Aug 2023 | 3 mos",
                bullets: [
                  "Compiling and analyzing various datasets using Microsoft Office programs including Excel and PowerPoint, primarily concerning US Army installations.",
                  "Scraping the web for government documents and to research information on various topics.",
                  "Participating in a symposium presenting a research topic I explored during my internship, focusing on garden bed irrigation optimization.",
                ],
              },
            ].map((exp, idx, arr) => (
              <div key={idx} className="flex w-full relative">
                <div className="flex flex-col items-center mr-3 @xl:mr-4">
                  <div className="w-2.5 h-2.5 @xl:w-3 @xl:h-3 rounded-full bg-foreground mt-1" />
                  {idx !== arr.length - 1 && (
                    <div className="w-[2px] flex-1 bg-foreground -mb-1" />
                  )}
                </div>
                <div className="pb-4 @xl:pb-6">
                  <h4 className="text-foreground text-sm @xl:text-md font-bold">{exp.title}</h4>
                  <p className="text-foreground text-xs @xl:text-sm">{exp.org}</p>
                  <p className="text-foreground/75 text-[10px] @xl:text-xs pt-1">{exp.time}</p>
                  <ul className="list-disc list-inside text-foreground text-xs @xl:text-sm pt-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className={i !== 0 ? "pt-1 @xl:pt-1.5" : ""}>
                        {b.split(" ").map((word, idx) =>
                        word.startsWith("https") ? (
                          <a
                          key={idx}
                          href={word}
                          className="hover:underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                          >
                          {" "}{word}
                          </a>
                        ) : (
                          <span key={idx}> {word}</span>
                        )
                        )}
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
            {[
              {
                icon: <GraduationCap className="w-5 h-5 @xl:w-6 @xl:h-6 stroke-1" />,
                school: "Georgia Institute of Technology",
                degree: "Bachelor of Science - BS, Computer Science",
                time: "Aug 2024 - May 2027",
                details: [
                  ["School Year:", "Sophomore"],
                  ["GPA:", "3.76"],
                  ["Clubs & Activities:", "Big Data Big Impact (BDBI), GT WebDev, VGDev, Grand Challenges, Korean Undergraduate Student Association (KUSA)"],
                  ["Relevant Courses:", "Data Structures & Algorithms, Intro Object-Oriented Programming, Discrete Math, Linear Algebra, Elementary Korean"],
                ],
              },
              {
                icon: <BookOpen className="w-4 h-4 @xl:w-5 @xl:h-5 stroke-1 mt-0.5 mr-1" />,
                school: "Whitman College",
                degree: "High School Enrichment Program",
                time: "Aug 2022 - May 2024",
                details: [
                  ["GPA:", "4.0"],
                  ["Relevant Courses:", "Data Structures, Software Performance Optimization, Discrete Math and Functional Programming, Databases"],
                ],
              },
            ].map((edu, idx) => (
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
