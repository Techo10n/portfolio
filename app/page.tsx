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
import "./globals.css";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="relative min-h-screen font-[family-name:var(--font-jetbrains-mono)]">
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
          {showAbout && <About onClose={() => setShowAbout(false)} />}
          {showProjects && <Projects onClose={() => setShowProjects(false)} />}
          {showResume && <Resume onClose={() => setShowResume(false)} />}
          {showContacts && <Contacts onClose={() => setShowContacts(false)} />}
          {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
        </main>
        <div className="row-start-3">
          <TaskBar onAboutClick={() => setShowAbout(true)} onProjectsClick={() => setShowProjects(true)} onResumeClick={() => setShowResume(true)} onContactsClick={() => setShowContacts(true)} onTerminalClick={() => setShowTerminal(true)} />
        </div>
        <footer className="row-start-4 mb-5">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
