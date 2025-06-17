"use client";

import { useState } from 'react';
import Footer from "@/components/Footer";
import TaskBar from "@/components/TaskBar";
import About from "./programs/About";
import Projects from "./programs/Projects";
import Resume from "./programs/Resume";
import Contacts from "./programs/Contacts";
import Terminal from "./programs/Terminal";
import TopBar from "@/components/TopBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import "./globals.css";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div suppressHydrationWarning className="relative min-h-screen font-[family-name:var(--font-jetbrains-mono)]">
      <div className="absolute inset-0 -z-20 animate-gradient-radial" />
      <div className="grid grid-rows-[20px_1fr_20px_20px] items-center justify-items-center min-h-screen gap-8">
        <nav className="row-start-1 pt-8 w-full">
          <TopBar />
        </nav>
        <main
          className={`row-start-2 w-[calc(100%-40px)] mx-5 flex flex-col h-[81vh] transition-transform duration-400 ease-out 
            ${showAbout ? "scale-100" : "scale-30"}
            ${showProjects ? "scale-100" : "scale-30"}
            ${showResume ? "scale-100" : "scale-30"}
            ${showContacts ? "scale-100" : "scale-30"}
            ${showTerminal ? "scale-100" : "scale-30"}
            ${showAbout || showProjects || showResume || showContacts || showTerminal ? "opacity-100" : "opacity-0"}`}
        >
          {(() => {
            const openWindows: { key: string; component: React.ReactElement }[] = [
              showAbout ? { key: "about", component: <About onClose={() => { setShowAbout(false) }} /> } : null,
              showProjects ? { key: "projects", component: <Projects onClose={() => { setShowProjects(false) }} /> } : null,
              showResume ? { key: "resume", component: <Resume onClose={() => { setShowResume(false) }} /> } : null,
              showContacts ? { key: "contacts", component: <Contacts onClose={() => { setShowContacts(false) }} /> } : null,
              showTerminal ? { key: "terminal", component: <Terminal onClose={() => { setShowTerminal(false) }} /> } : null,
            ].filter(Boolean) as { key: string; component: React.ReactElement }[]; 

            function renderPanels(windows: { key: string; component: React.ReactElement }[]): React.ReactNode {
              switch (windows.length) {
                case 0:
                  return null;

                case 1:
                  return (
                    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                      <ResizablePanel defaultSize={100} className="w-full h-full">
                        {windows[0].component}
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  );

                case 2:
                  return (
                    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                      <ResizablePanel defaultSize={50} className="mr-1.5">
                        {windows[0].component}
                      </ResizablePanel>
                      <ResizableHandle className="!border-none !bg-transparent" />
                      <ResizablePanel defaultSize={50} className="ml-1.5">
                        {windows[1].component}
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  );

                case 3:
                case 4:
                  return (
                    <ResizablePanelGroup direction="vertical" className="w-full h-full">
                      <ResizablePanel defaultSize={50} className="mb-1.5">
                        {renderPanels(windows.slice(0, 2))}
                      </ResizablePanel>
                      <ResizableHandle className="!border-none !bg-transparent" />
                      <ResizablePanel defaultSize={50} className="mt-1.5">
                        {renderPanels(windows.slice(2))}
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  );

                case 5:
                  return (
                    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                      <ResizablePanel defaultSize={80} className="mr-1.5">
                        {renderPanels(windows.slice(0, 4))}
                      </ResizablePanel>
                      <ResizableHandle className="!border-none !bg-transparent" />
                      <ResizablePanel defaultSize={20} className="ml-1.5">
                        {windows[4].component}
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  );

                default: {
                  const half = Math.ceil(windows.length / 2);
                  return (
                    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                      <ResizablePanel defaultSize={50} className="mr-1.5">
                        {renderPanels(windows.slice(0, half))}
                      </ResizablePanel>
                      <ResizableHandle className="!border-none !bg-transparent" />
                      <ResizablePanel defaultSize={50} className="ml-1.5">
                        {renderPanels(windows.slice(half))}
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  );
                }
              }
            }

            return renderPanels(openWindows);
          })()}
        </main>
        <div className="row-start-3">
          <TaskBar
            onAboutClick={() => {
              setShowAbout(true)
            }}
            onProjectsClick={() => {
              setShowProjects(true)
            }}
            onResumeClick={() => {
              setShowResume(true)
            }}
            onContactsClick={() => {
              setShowContacts(true)
            }}
            onTerminalClick={() => {
              setShowTerminal(true)
            }}
          />
        </div>
        <footer className="row-start-4 mb-5">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
