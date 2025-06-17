import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Projects({ onClose }: { onClose: () => void }) {
  return (
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
              Stuff I've Been Working On
            </h1>
            <h2 className="text-white text-lg font-extrabold mt-8">
              Personal Projects
            </h2>
            <div className="flex flex-wrap gap-8 items-start justify-start w-full h-full mt-4">
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    EcoShelf
                  </h3>
                  <p className="text-white text-xs">
                    Chrome extension to help people find more environmentally-friendly products as they shop online
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[60px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[105px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    This Website
                  </h3>
                  <p className="text-white text-xs">
                    My personal website portfolio
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    MusicBridge
                  </h3>
                  <p className="text-white text-xs">
                    Web app to conveniently share playlists across streaming services without requiring an account for the destination service
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-white text-lg font-extrabold mt-8">
              Clubs & Hackathons
            </h2>
            <div className="flex flex-wrap gap-8 items-start justify-start w-full h-full mt-4">
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    SimpliEarn
                  </h3>
                  <p className="text-white text-xs">
                    //description here
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[60px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[105px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    JourneyJar
                  </h3>
                  <p className="text-white text-xs">
                    //description here
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    EmpAIthetic
                  </h3>
                  <p className="text-white text-xs">
                    //description here
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    GameLogs
                  </h3>
                  <p className="text-white text-xs">
                    //description here
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-white text-lg font-extrabold mt-8">
              Client Work
            </h2>
            <div className="flex flex-wrap gap-8 items-start justify-start w-full h-full mt-4">
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    Blue Mountain Law Office Website Design
                  </h3>
                  <p className="text-white text-xs">
                    A website built in Framer for a law office that provides information about their services and allows clients to book appointments
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[60px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[105px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    ILJCW Website Design
                  </h3>
                  <p className="text-white text-xs">
                    //description here
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    Inland Octopus Website Development
                  </h3>
                  <p className="text-white text-xs">
                    //description here
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    Welcome Home Properties Database Software
                  </h3>
                  <p className="text-white text-xs">
                    //description here
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-white text-lg font-extrabold mt-8">
              Other Ventures
            </h2>
            <div className="flex flex-wrap gap-8 items-start justify-start w-full h-full mt-4">
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[90px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[135px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    GT VGDev Trailers
                  </h3>
                  <p className="text-white text-xs">
                    //description here
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end w-90 h-55 border border-white rounded-2xl cursor-pointer transition-colors flex-shrink-0 group">
                <div className="flex flex-col items-start justify-start w-full h-[60px] bg-black/20 rounded-t-lg px-6 pt-2 pb-3 transition-all duration-300 group-hover:h-[105px] overflow-hidden">
                  <h3 className="text-white text-lg font-extrabold">
                    Techolon
                  </h3>
                  <p className="text-white text-xs">
                    My personal YouTube channel where I post video game montages and edits
                  </p>
                  <div className="flex flex-row items-center justify-start my-3 gap-3">
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      Learn More <span className="ml-1">→</span>
                    </button>
                    <button className="text-white text-xs px-2 py-1 rounded-2xl border border-white border-0.5 hover:bg-white/10 transition-colors cursor-pointer">
                      View Demo <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ScrollArea>
  );
}
