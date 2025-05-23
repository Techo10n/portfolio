import WindowControlButtons from "@/components/WindowControlButtons";


export default function Projects({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-start justify-start border rounded-[20px] bg-white/8 backdrop-blur-lg w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent">
      <main className="w-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-white text-xs pt-2.5 pl-3">
            My Projects
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full px-14 py-8">
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-white text-3xl font-extrabold">
              Stuff I've Been Working On
            </h1>
            <h2 className="text-white text-lg font-extrabold mt-8">
              Personal Projects
            </h2>
            <div className="flex flex-row grid grid-cols-3 gap-8 items-start justify-start w-full mt-4">
              <div
                className="flex flex-col items-start justify-start w-full border border-white rounded-lg p-4"
                style={{ aspectRatio: "1920 / 1080" }}
              >
              </div>
              <div
                className="flex flex-col items-start justify-start w-full border border-white rounded-lg p-4"
                style={{ aspectRatio: "1920 / 1080" }}
              >
              </div>
              <div
                className="flex flex-col items-start justify-start w-full border border-white rounded-lg p-4"
                style={{ aspectRatio: "1920 / 1080" }}
              >
              </div>
            </div>
            <h2 className="text-white text-lg font-extrabold mt-8">
              Clubs & Hackathons
            </h2>
            <h2 className="text-white text-lg font-extrabold mt-8">
              Client Work
            </h2>
            <h2 className="text-white text-lg font-extrabold mt-8">
              Other Ventures
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}
