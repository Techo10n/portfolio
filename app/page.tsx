import Footer from "@/components/Footer";
import TaskBar from "@/components/TaskBar";
import WindowControlButtons from "@/components/WindowControlButtons";
import TopBar from "@/components/TopBar";
import "./globals.css";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px_20px] items-center justify-items-center min-h-screen gap-8 font-[family-name:var(--font-jetbrains-mono)]">
      <div className="row-start-1 pt-8 w-full">
        <TopBar />
      </div>
      <main className="flex flex-col row-start-2 items-end justify-start border rounded-[20px] bg-white/8 backdrop-blur-lg w-[calc(100%-40px)] h-full mx-5">
        <div className="flex flex-col items-center justify-center pt-3 pr-3">
          <WindowControlButtons />
        </div>
      </main>
      <div className="row-start-3">
        <TaskBar />
      </div>
      <footer className="row-start-4 mb-5">
        <Footer />
      </footer>
    </div>
  );
}
