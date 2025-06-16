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
  const [windowCount, setWindowCount] = useState(0);

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
          <ResizablePanelGroup direction="horizontal" className={`w-full h-full`}>
            <ResizablePanel defaultSize={100} className="mr-1.5">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={100} className="mb-1.5">
                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={100} className="mr-1.5">
                      {showAbout && <About onClose={() => { setShowAbout(false); setWindowCount(windowCount - 1); }} />}
                    </ResizablePanel>
                    <ResizableHandle className="!border-none !bg-transparent" />
                    <ResizablePanel defaultSize={100} className={`ml-1.5`}>
                      {showProjects && <Projects onClose={() => { setShowProjects(false); setWindowCount(windowCount - 1); }} />}
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle className="!border-none !bg-transparent" />
                <ResizablePanel defaultSize={100} className={`mt-1.5`}>
                  <ResizablePanelGroup direction="horizontal" className="h-full w-full">
                    <ResizablePanel defaultSize={100} className="mr-1.5">
                      {showResume && <Resume onClose={() => { setShowResume(false); setWindowCount(windowCount - 1); }} />}
                    </ResizablePanel>
                    <ResizableHandle className="!border-none !bg-transparent" />
                    <ResizablePanel defaultSize={100} className={`ml-1.5`}>
                      {showContacts && <Contacts onClose={() => { setShowContacts(false); setWindowCount(windowCount - 1); }} />}
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle className="!border-none !bg-transparent" />
            <ResizablePanel defaultSize={100} className={`ml-1.5`}>
              {showTerminal && <Terminal onClose={() => { setShowTerminal(false); setWindowCount(windowCount - 1); }} />}
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
        <div className="row-start-3">
          <TaskBar
            onAboutClick={() => {
              setShowAbout(true);
              setWindowCount(windowCount + 1);
            }}
            onProjectsClick={() => {
              setShowProjects(true);
              setWindowCount(windowCount + 1);
            }}
            onResumeClick={() => {
              setShowResume(true);
              setWindowCount(windowCount + 1);
            }}
            onContactsClick={() => {
              setShowContacts(true);
              setWindowCount(windowCount + 1);
            }}
            onTerminalClick={() => {
              setShowTerminal(true);
              setWindowCount(windowCount + 1);
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
