import WindowControlButtons from "@/components/WindowControlButtons";
import Image from "next/image";
import { MapPin, GraduationCap, BookOpen } from "lucide-react";
import { siReact, siNextdotjs, siTailwindcss, siTypescript, siJavascript, siExpress, siMongodb, siPython, siFigma } from "simple-icons/icons";
import SimpleIcon from "@/components/SimpleIcon";
import { FaJava } from "react-icons/fa";


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
    // { icon: siAdobeaftereffects, label: "After Effects", link: "https://www.adobe.com/products/aftereffects.html" },
  ];
  

  return (
    <div className="flex flex-col items-start justify-start border rounded-[20px] bg-white/8 backdrop-blur-lg w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent">
      <main className="w-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-white text-xs pt-2.5 pl-3">
            About Me
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full px-14 py-8">
          <div className="flex flex-row items-start justify-start w-full">
            <Image
              src="/pfp.jpg"
              alt="Portfolio"
              width={200}
              height={200}
              className="w-[200px] h-[200px] object-cover rounded-full border border-white"
            />
            <div className="flex flex-col items-start justify-center w-full h-full pl-6">
              <h1 className="text-white text-3xl font-extrabold">
                Zechariah Frierson
              </h1>
              <h2 className="text-white text-lg">
                Full Stack Web Developer & Designer
              </h2>
              <span className="text-white text-sm mt-2">
                <MapPin className="inline-block w-4 h-4 mr-2 stroke-1" />
                Walla Walla, WA | United States
              </span>
              <div className="flex flex-row items-center justify-start gap-2.5 mt-4">
                {socials.map(({ icon, link }, index) => (
                <div key={index} className="relative group flex flex-col items-center">
                  <button className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center w-8 h-8 border border-white rounded-full">
                    <a href={link} className={`${icon} text-white text-lg`} target="_blank" rel="noopener noreferrer"></a>
                  </button>
                </div>
                ))}
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="w-full h-px bg-white/50 mt-10"></div>

          <div className="w-full mt-4 text-white text-sm">
            <p className="mb-4">
              Hey, I'm Zechariah, often known as Zach or "Zech," and I'm a Sophomore at Georgia Institute of Technology in Atlanta. I am extremely passionate about computer programming, along with video editing and web design.
            </p>
            <p className="mb-4">
              Alongside my STEM interests, I also enjoy soccer, volleyball, and music.
            </p>
            <p>
              I am obsessed with seeing my work come to life before my eyes, and I dream of working in a field that allows me to create something out of nothing.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-6">
            <h3 className="text-white text-lg font-extrabold">
                What I Work With
            </h3>
            <div className="flex flex-row flex-wrap gap-3 mt-2">
              {tools.map(({ icon, component, label, link }, index) => (
                <SimpleIcon key={index} icon={icon} component={component} label={label} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-6">
            <h3 className="text-white text-lg font-extrabold">Experience</h3>
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
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 rounded-full bg-white mt-1" />
                    {idx !== arr.length - 1 && (
                      <div className="w-[2px] flex-1 bg-white -mb-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h4 className="text-white text-md font-bold">{exp.title}</h4>
                    <p className="text-white text-sm">{exp.org}</p>
                    <p className="text-white/75 text-xs pt-1">{exp.time}</p>
                    <ul className="list-disc list-inside text-white text-sm pt-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className={i !== 0 ? "pt-1.5" : ""}>
                          {b.split(" ").map((word, idx) =>
                          word.startsWith("https") ? (
                            <a
                            key={idx}
                            href={word}
                            className="hover:underline"
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
          <div className="flex flex-col items-start justify-start w-full">
            <h3 className="text-white text-lg font-extrabold">Education</h3>
            <div className="flex flex-col w-full mt-2">
              {[
                {
                  icon: <GraduationCap className="w-6 h-6 stroke-1" />,
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
                  icon: <BookOpen className="w-5 h-5 stroke-1 mt-0.5 mr-1" />,
                  school: "Whitman College",
                  degree: "High School Enrichment Program",
                  time: "Aug 2022 - May 2024",
                  details: [
                    ["GPA:", "4.0"],
                    ["Relevant Courses:", "Data Structures, Software Performance Optimization, Discrete Math and Functional Programming, Databases"],
                  ],
                },
              ].map((edu, idx) => (
                <div key={idx} className={`flex flex-row items-start justify-start w-full ${idx > 0 ? "pt-6" : ""}`}>
                  {/* Icon */}
                  <div className="flex flex-col items-center pr-2">
                    {edu.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col items-start justify-start">
                    <h4 className="text-white text-md font-bold">{edu.school}</h4>
                    <p className="text-white text-sm">{edu.degree}</p>
                    <p className="text-white/75 text-xs pt-1">{edu.time}</p>
                    <div className="list-disc list-inside text-white text-sm pt-1 space-y-1.5">
                      {edu.details.map(([label, value], i) => (
                        <span key={i} className="text-white text-sm block">
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
    </div>
  );
}
