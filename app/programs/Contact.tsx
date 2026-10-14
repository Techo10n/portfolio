import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";

const EMAIL = "zechariahfrierson@gmail.com";

const circle =
  "flex items-center justify-center w-8 h-8 shrink-0 rounded-full border border-foreground/25 hover:bg-foreground/10 transition-colors cursor-pointer";

export default function Contact() {
  return (
    <div className="w-full px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8 pb-10">
      <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">Get in touch</h1>
      <p className="text-[15px] leading-relaxed text-foreground/85 mt-2 max-w-[60ch]">
        Email is the fastest way to reach me. You can also send a message here and it&apos;ll land in my inbox.
      </p>

      <div className="flex items-center gap-2 mt-4 rounded-xl border border-foreground/15 bg-foreground/[0.03] p-3 max-w-md">
        {/* If it has to wrap, wrap after the @ rather than mid-word. */}
        <span className="font-mono text-sm min-w-0 flex-1 [overflow-wrap:anywhere]">
          {EMAIL.split("@")[0]}@<wbr />
          {EMAIL.split("@")[1]}
        </span>
        <CopyButton value={EMAIL} label="Copy email address" className={circle} />
        <a href={`mailto:${EMAIL}`} aria-label="Send an email" title="Send an email" className={circle}>
          <Mail aria-hidden="true" className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-8 max-w-md">
        <ContactForm />
      </div>
    </div>
  );
}
