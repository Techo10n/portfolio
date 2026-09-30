import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import Tilt from "@/components/Tilt";

const PDF = "/resume.pdf";

const buttonClass =
  "inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-foreground/25 text-sm hover:bg-foreground/10 transition-colors";

export default function Resume() {
  return (
    <div className="w-full pb-10">
      <div className="flex flex-col justify-start items-start w-full h-full px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8">
        <div className="flex flex-col @xl:flex-row @xl:items-center justify-between gap-3 w-full">
          <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">Resume</h1>
          <div className="flex flex-row flex-wrap gap-3">
            <a href={PDF} target="_blank" rel="noopener noreferrer" className={buttonClass}>
              <ExternalLink aria-hidden="true" className="w-4 h-4" />
              Open PDF
            </a>
            <a href={PDF} download="Zechariah Frierson Resume.pdf" className={buttonClass}>
              <Download aria-hidden="true" className="w-4 h-4" />
              Download
            </a>
          </div>
        </div>
        <a
          href={PDF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open resume PDF"
          className="block w-full max-w-[620px] mx-auto mt-6 @xl:mt-8"
        >
          <Tilt
            scale={1.0}
            transitionSpeed={2000}
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            className="rounded-xl overflow-hidden border border-foreground/30 shadow-lg"
          >
            <Image
              src="/resume-preview.png"
              alt="Page 1 of Zechariah Frierson's resume"
              width={1313}
              height={1700}
              sizes="(min-width: 768px) 620px, 100vw"
              className="w-full h-auto bg-white"
            />
          </Tilt>
        </a>
      </div>
    </div>
  );
}
