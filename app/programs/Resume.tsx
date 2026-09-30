import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import Tilt from "@/components/Tilt";

const PDF = "/resume.pdf";

const buttonClass =
  "inline-flex items-center gap-1.5 text-foreground text-xs px-3 py-1.5 rounded-2xl border border-foreground/50 hover:bg-foreground/10 transition-colors";

export default function Resume() {
  return (
    <div className="w-full pb-8">
      <div className="flex flex-col justify-start items-start w-full h-full px-4 @xl:px-8 @3xl:px-14 py-4 @xl:py-6 @3xl:py-8">
        <div className="flex flex-col @xl:flex-row @xl:items-center justify-between gap-3 w-full">
          <h1 className="text-foreground text-xl @xl:text-2xl @3xl:text-3xl font-extrabold">
            My Resume
          </h1>
          <div className="flex flex-row flex-wrap gap-3">
            <a href={PDF} target="_blank" rel="noopener noreferrer" className={buttonClass}>
              <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 stroke-1.5" />
              Open PDF
            </a>
            <a href={PDF} download="Zechariah Frierson Resume.pdf" className={buttonClass}>
              <Download aria-hidden="true" className="w-3.5 h-3.5 stroke-1.5" />
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
