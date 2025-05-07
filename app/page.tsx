"use client";

import { useState } from 'react';
import Footer from "@/components/Footer";
import TaskBar from "@/components/TaskBar";
import About from "./programs/About";
import TopBar from "@/components/TopBar";
import "./globals.css";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="relative min-h-screen font-[family-name:var(--font-jetbrains-mono)]">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-25"
        src="/bg-temp-video.mp4"
        autoPlay
        loop
        muted
      ></video>

      <div className="grid grid-rows-[20px_1fr_20px_20px] items-center justify-items-center min-h-screen gap-8">
        <nav className="row-start-1 pt-8 w-full">
          <TopBar />
        </nav>
        <main
          className={`row-start-2 w-[calc(100%-40px)] mx-5 flex flex-col h-[81vh] transition-transform duration-400 ease-out ${
            showAbout ? "scale-100" : "scale-30"
          }`}
        >
          {showAbout && <About onClose={() => setShowAbout(false)} />}
        </main>
        <div className="row-start-3">
          <TaskBar onAboutClick={() => setShowAbout(true)} />
        </div>
        <footer className="row-start-4 mb-5">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
