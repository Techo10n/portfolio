import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="w-full pb-8">
      <div className="flex flex-col justify-start items-start w-full h-full px-4 sm:px-8 md:px-14 py-4 sm:py-6 md:py-8">
        <div className="flex flex-row items-start justify-start w-full">
          <h1 className="text-foreground text-xl sm:text-2xl md:text-3xl font-extrabold">
            Contact Me!
          </h1>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-6">
          <ContactForm/>
        </div>
      </div>
    </div>
  );
}
