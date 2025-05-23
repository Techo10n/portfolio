import WindowControlButtons from "@/components/WindowControlButtons";


export default function Contacts({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-start justify-start border rounded-[20px] bg-white/8 backdrop-blur-lg w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent">
      <main className="w-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-white text-xs pt-2.5 pl-3">
            Contacts
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full px-14 py-8">
          <div className="flex flex-row items-start justify-start w-full">
            <h1 className="text-white text-3xl font-extrabold">
              Stuff I've Been Working On
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}