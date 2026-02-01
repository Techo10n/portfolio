import WindowControlButtons from "@/components/WindowControlButtons";
import Image from "next/image";
import { MapPin, GraduationCap, BookOpen } from "lucide-react";
import { siReact, siNextdotjs, siTailwindcss, siTypescript, siJavascript, siExpress, siMongodb, siPython, siFigma } from "simple-icons/icons";
import SimpleIcon from "@/components/SimpleIcon";
import { FaJava } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function About({ onClose }: { onClose: () => void }) {
  const socials = [
    { icon: 'icon-social-linkedin', label: 'LinkedIn', link: 'https://www.linkedin.com/in/zechariah-frierson/' },
    { icon: 'icon-social-github', label: 'GitHub', link: 'https://github.com/Techo10n' },
    { icon: 'icon-social-youtube', label: 'YouTube', link: 'https://www.youtube.com/@techolon' },
    { icon: 'icon-envelope', label: 'Email', link: 'mailto:zechariahfrierson@gmail.com' },
    { icon: 'icon-social-instagram', label: 'Instagram', link: 'https://www.instagram.com/techolon_/' },
  ];

  const tools = [
    { icon: siReact, label: "React", link: "https://reactjs.org/" },
    { icon: siNextdotjs, label: "Next.js", link: "https://nextjs.org/" },
    { icon: siTailwindcss, label: "Tailwind CSS", link: "https://tailwindcss.com/" },
    { icon: siTypescript, label: "TypeScript", link: "https://www.typescriptlang.org/" },
    { icon: siJavascript, label: "JavaScript", link: "https://www.javascript.com/" },
    { icon: siExpress, label: "Express", link: "https://expressjs.com/" },
    { icon: siMongodb, label: "MongoDB", link: "https://www.mongodb.com/" },
    { component: FaJava, label: "Java", link: "https://www.java.com/" },
    { icon: siPython, label: "Python", link: "https://www.python.org/" },
    { icon: siFigma, label: "Figma", link: "https://www.figma.com/" },
  ];


  return (
    <ScrollArea className="flex flex-col items-start justify-start border border-foreground/20 rounded-[20px] bg-foreground/8 backdrop-blur-lg w-full h-full">
      <main className="w-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-foreground text-xs pt-2.5 pl-3">
            About Me
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start w-full h-full px-4 sm:px-8 md:px-14 py-4 sm:py-6 md:py-8">
          {/* Profile Section - Stack on mobile, side by side on larger screens */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start w-full gap-4 sm:gap-0">
            <Image
              src="/pfp.jpg"
              alt="Portfolio"
              width={200}
              height={200}
              className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] object-cover rounded-full border border-foreground/50 flex-shrink-0"
            />
            <div className="flex flex-col items-center sm:items-start justify-center w-full sm:h-[150px] md:h-[200px] sm:pl-6 text-center sm:text-left">
              <h1 className="text-foreground text-xl sm:text-2xl md:text-3xl font-extrabold">
                Zechariah Frierson
              </h1>
              <h2 className="text-foreground text-sm sm:text-base md:text-lg">
                Full Stack Web Developer & Designer
              </h2>
              <span className="text-foreground text-xs sm:text-sm mt-2">
                <MapPin className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 stroke-1" />
                Walla Walla, WA | United States
              </span>
              <div className="flex flex-row items-center justify-center sm:justify-start gap-2 sm:gap-2.5 mt-3 sm:mt-4">
                {socials.map(({ icon, link }, index) => (
                <div key={index} className="relative group flex flex-col items-center">
                  <button className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 border border-foreground/50 rounded-full">
                    <a href={link} className={`${icon} text-foreground text-base sm:text-lg`} target="_blank" rel="noopener noreferrer"></a>
                  </button>
                </div>
                ))}
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="w-full h-px bg-foreground/50 mt-6 sm:mt-8 md:mt-10"></div>

          <div className="w-full mt-4 text-foreground text-xs sm:text-sm">
            <p className="mb-3 sm:mb-4">
              Hey, I&apos;m Zechariah, often known as Zach or &ldquo;Zech,&rdquo; and I&apos;m a Sophomore at Georgia Institute of Technology in Atlanta. I am extremely passionate about computer programming, along with video editing and web design.
            </p>
            <p className="mb-3 sm:mb-4">
              Alongside my STEM interests, I also enjoy soccer, volleyball, and music.
            </p>
            <p>
              I am obsessed with seeing my work come to life before my eyes, and I dream of working in a field that allows me to create something out of nothing.
            </p>
          </div>

          {/* Skills Section */}
          <div className="flex flex-col items-start justify-start w-full mt-4 sm:mt-6">
            <h3 className="text-foreground text-base sm:text-lg font-extrabold">
                What I Work With
            </h3>
            <div className="flex flex-row flex-wrap gap-2 sm:gap-3 mt-2">
              {tools.map(({ icon, component, label, link }, index) => (
                <SimpleIcon key={index} icon={icon} component={component} label={label} link={link} />
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="flex flex-col items-start justify-start w-full mt-4 sm:mt-6">
            <h3 className="text-foreground text-base sm:text-lg font-extrabold">Experience</h3>
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
                  <div className="flex flex-col items-center mr-3 sm:mr-4">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-foreground mt-1" />
                    {idx !== arr.length - 1 && (
                      <div className="w-[2px] flex-1 bg-foreground -mb-1" />
                    )}
                  </div>
                  <div className="pb-4 sm:pb-6">
                    <h4 className="text-foreground text-sm sm:text-md font-bold">{exp.title}</h4>
                    <p className="text-foreground text-xs sm:text-sm">{exp.org}</p>
                    <p className="text-foreground/75 text-[10px] sm:text-xs pt-1">{exp.time}</p>
                    <ul className="list-disc list-inside text-foreground text-xs sm:text-sm pt-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className={i !== 0 ? "pt-1 sm:pt-1.5" : ""}>
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
            <h3 className="text-foreground text-base sm:text-lg font-extrabold">Education</h3>
            <div className="flex flex-col w-full mt-2">
              {[
                {
                  icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />,
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
                  icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 stroke-1 mt-0.5 mr-1" />,
                  school: "Whitman College",
                  degree: "High School Enrichment Program",
                  time: "Aug 2022 - May 2024",
                  details: [
                    ["GPA:", "4.0"],
                    ["Relevant Courses:", "Data Structures, Software Performance Optimization, Discrete Math and Functional Programming, Databases"],
                  ],
                },
              ].map((edu, idx) => (
                <div key={idx} className={`flex flex-row items-start justify-start w-full ${idx > 0 ? "pt-4 sm:pt-6" : ""}`}>
                  {/* Icon */}
                  <div className="flex flex-col items-center pr-2">
                    {edu.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col items-start justify-start">
                    <h4 className="text-foreground text-sm sm:text-md font-bold">{edu.school}</h4>
                    <p className="text-foreground text-xs sm:text-sm">{edu.degree}</p>
                    <p className="text-foreground/75 text-[10px] sm:text-xs pt-1">{edu.time}</p>
                    <div className="list-disc list-inside text-foreground text-xs sm:text-sm pt-1 space-y-1 sm:space-y-1.5">
                      {edu.details.map(([label, value], i) => (
                        <span key={i} className="text-foreground text-xs sm:text-sm block">
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
      </main>
    </ScrollArea>
  );
}
