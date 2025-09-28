import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";
import empaitheticScreenshot from "@/public/empaithetic-screenshot.jpg";
import bmlScreenshot from "@/public/bml-screenshot.png";
import ytScreenshot from "@/public/yt-screenshot.png";

export default function Projects({ onClose }: { onClose: () => void }) {
  return (
    <>
      <ScrollArea className="flex flex-col items-start justify-start border rounded-[20px] bg-white/8 backdrop-blur-lg w-full h-full">
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
                Stuff I&apos;ve Been Working On
              </h1>
              <h2 className="text-white text-lg font-extrabold mt-8">
                Personal Projects
              </h2>
              <div className="flex flex-wrap gap-8 items-start justify-start w-full h-full mt-4">
                <div
                  className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group"
                >
                  <div className="flex flex-col items-start justify-start w-full h-[94px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[136px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      EcoShelf
                    </h3>
                    <p className="text-white text-xs">
                      Chrome extension to help people find more environmentally-friendly products as they shop online
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button
                        className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button
                        className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={e => e.stopPropagation()}
                      >
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[62px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[104px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      This Website
                    </h3>
                    <p className="text-white text-xs">
                      My personal website portfolio
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[94px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[136px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      MusicBridge
                    </h3>
                    <p className="text-white text-xs">
                      Web app to conveniently share playlists across streaming services without requiring an account for the destination service
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-white text-lg font-extrabold mt-8">
                Clubs & Hackathons
              </h2>
              <div className="flex flex-wrap gap-8 items-start justify-start w-full h-full mt-4">
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[62px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[104px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      SimpliEarn
                    </h3>
                    <p className="text-white text-xs">
                      {/* description here */}
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[62px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[104px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      JourneyJar
                    </h3>
                    <p className="text-white text-xs">
                      {/* description here */}
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group"
                  style={{
                    backgroundImage: `url(${empaitheticScreenshot.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                  }}
                >
                  <div className="flex flex-col items-start justify-start w-full h-[94px] bg-black/85 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[136px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      EmpAIthetic
                    </h3>
                    <p className="text-white text-xs">
                      An AI-powered journaling app for expressing emotions and receiving support. Built for HackGT 11.
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <a
                        className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer"
                        href="https://www.youtube.com/watch?v=G2bBY3_221M"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Demo <span className="ml-1">→</span>
                      </a>
                      <a
                        className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer"
                        href="https://github.com/Techo10n/shaz"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source Code <span className="ml-1">→</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[62px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[104px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      GameLogs
                    </h3>
                    <p className="text-white text-xs">
                      {/* description here */}
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-white text-lg font-extrabold mt-8">
                Client Work
              </h2>
              <div className="flex flex-wrap gap-8 items-start justify-start w-full h-full mt-4">
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group"
                  style={{
                    backgroundImage: `url(${bmlScreenshot.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="flex flex-col items-start justify-start w-full h-[94px] bg-black/85 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[136px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      Blue Mountain Law Office Website
                    </h3>
                    <p className="text-white text-xs">
                      A modern website for a local law office, built in Framer, featuring service details and online appointment booking.
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <a className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer"
                        href="https://www.bluemountainlawoffice.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Site <span className="ml-1">→</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[62px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[104px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      ILJCW Website Design
                    </h3>
                    <p className="text-white text-xs">
                      {/* description here */}
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[88px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[132px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      Inland Octopus Website Development
                    </h3>
                    <p className="text-white text-xs">
                      {/* description here */}
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[88px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[132px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      Welcome Home Properties Database Software
                    </h3>
                    <p className="text-white text-xs">
                      {/* description here */}
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-white text-lg font-extrabold mt-8">
                Other Ventures
              </h2>
              <div className="flex flex-wrap gap-8 items-start justify-start w-full h-full mt-4">
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                  <div className="flex flex-col items-start justify-start w-full h-[62px] bg-black/20 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[104px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      GT VGDev Trailers
                    </h3>
                    <p className="text-white text-xs">
                      {/* description here */}
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        View Demo <span className="ml-1">→</span>
                      </button>
                      <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                        Source Code <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end w-[26rem] h-[15.96rem] border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group"
                  style={{
                    backgroundImage: `url(${ytScreenshot.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                  }}
                >
                  <div className="flex flex-col items-start justify-start w-full h-[76px] bg-black/85 rounded-b-2xl px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[120px] overflow-hidden">
                    <h3 className="text-white text-lg font-extrabold">
                      Techolon
                    </h3>
                    <p className="text-white text-xs">
                      My personal YouTube channel where I post video game montages and edits
                    </p>
                    <div className="flex flex-row items-center justify-start my-3 gap-3">
                      <a className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer"
                        href="https://www.youtube.com/@techolon"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Channel <span className="ml-1">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </ScrollArea>
    </>
  );
}
