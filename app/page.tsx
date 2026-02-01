"use client";

import { useState, useMemo } from 'react';
import Footer from "@/components/Footer";
import TaskBar from "@/components/TaskBar";
import About from "./programs/About";
import Projects from "./programs/Projects";
import Resume from "./programs/Resume";
import Contacts from "./programs/Contacts";
import Terminal from "./programs/Terminal";
import TopBar from "@/components/TopBar";
import WindowWrapper from "@/components/WindowWrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import "./globals.css";

type WindowConfig = {
  key: string;
  isOpen: boolean;
  component: React.ReactElement;
};

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const anyWindowOpen = showAbout || showProjects || showResume || showContacts || showTerminal;

  // Memoize window configurations to prevent unnecessary re-renders
  const windowConfigs: WindowConfig[] = useMemo(() => [
    {
      key: "about",
      isOpen: showAbout,
      component: <About onClose={() => setShowAbout(false)} />
    },
    {
      key: "projects",
      isOpen: showProjects,
      component: <Projects onClose={() => setShowProjects(false)} />
    },
    {
      key: "resume",
      isOpen: showResume,
      component: <Resume onClose={() => setShowResume(false)} />
    },
    {
      key: "contacts",
      isOpen: showContacts,
      component: <Contacts onClose={() => setShowContacts(false)} />
    },
    {
      key: "terminal",
      isOpen: showTerminal,
      component: <Terminal onClose={() => setShowTerminal(false)} />
    },
  ], [showAbout, showProjects, showResume, showContacts, showTerminal]);

  const openWindows = windowConfigs.filter(w => w.isOpen);

  function renderPanels(windows: WindowConfig[]): React.ReactNode {
    switch (windows.length) {
      case 0:
        return null;

      case 1:
        return (
          <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={100} className="w-full h-full">
              <WindowWrapper isOpen={windows[0].isOpen}>
                {windows[0].component}
              </WindowWrapper>
            </ResizablePanel>
          </ResizablePanelGroup>
        );

      case 2:
        return (
          <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={50} className="mr-1.5">
              <WindowWrapper isOpen={windows[0].isOpen}>
                {windows[0].component}
              </WindowWrapper>
            </ResizablePanel>
            <ResizableHandle className="!border-none !bg-transparent" />
            <ResizablePanel defaultSize={50} className="ml-1.5">
              <WindowWrapper isOpen={windows[1].isOpen}>
                {windows[1].component}
              </WindowWrapper>
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
              <WindowWrapper isOpen={windows[4].isOpen}>
                {windows[4].component}
              </WindowWrapper>
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

  return (
    <div suppressHydrationWarning className="relative min-h-screen font-[family-name:var(--font-jetbrains-mono)]">
      <div className="absolute inset-0 -z-20 animate-gradient-radial" />
      <div className="grid grid-rows-[20px_1fr_auto_auto] items-center justify-items-center min-h-screen gap-4 sm:gap-6 md:gap-8">
        <nav className="row-start-1 pt-4 sm:pt-6 md:pt-8 w-full">
          <TopBar />
        </nav>
        <main
          className={`row-start-2 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] md:w-[calc(100%-40px)] mx-2 sm:mx-4 md:mx-5 flex flex-col h-[75vh] sm:h-[78vh] md:h-[81vh] transition-opacity duration-300 ease-out ${
            anyWindowOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {renderPanels(openWindows)}
        </main>
        <div className="row-start-3">
          <TaskBar
            onAboutClick={() => setShowAbout(true)}
            onProjectsClick={() => setShowProjects(true)}
            onResumeClick={() => setShowResume(true)}
            onContactsClick={() => setShowContacts(true)}
            onTerminalClick={() => setShowTerminal(true)}
          />
        </div>
        <footer className="row-start-4 mb-5">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
