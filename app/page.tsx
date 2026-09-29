import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Desktop from "@/components/desktop/Desktop";
import About from "./programs/About";
import Projects from "./programs/Projects";
import Resume from "./programs/Resume";
import Contact from "./programs/Contact";
import Terminal from "./programs/Terminal";

export default function Home() {
  return (
    <div className="relative h-dvh overflow-hidden font-[family-name:var(--font-jetbrains-mono)]">
      <div className="absolute inset-0 -z-20 animate-gradient-radial" />
      <div className="grid grid-rows-[auto_1fr_auto_auto] h-full items-center justify-items-center gap-2 sm:gap-3 pt-3 sm:pt-4 md:pt-5 pb-2 sm:pb-3">
        <header className="w-full">
          <TopBar />
        </header>
        <Desktop
          programs={{
            about: <About />,
            projects: <Projects />,
            resume: <Resume />,
            contact: <Contact />,
            terminal: <Terminal />,
          }}
        />
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
