import Tilt from "@/components/Tilt";
import Image from 'next/image';

export default function Resume() {
  return (
    <div className="w-full pb-8">
      <div className="flex flex-col justify-start items-start w-full h-full px-4 sm:px-8 md:px-14 py-4 sm:py-6 md:py-8">
        <div className="flex flex-row items-start justify-start w-full">
          <h1 className="text-foreground text-xl sm:text-2xl md:text-3xl font-extrabold">
            My Resume
          </h1>
        </div>
      </div>
      <Tilt
        scale={1.0}
        transitionSpeed={2000}
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        className="w-[320px] h-[413px] rounded-xl justify-center items-center flex mx-auto my-8"
      >
        <Image height={413} width={320} src="/resume.png" alt="Resume" className="w-full h-full object-cover rounded-xl"/>
      </Tilt>
    </div>
  );
}
