import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";

const EMAIL = "zechariahfrierson@gmail.com";

const pill =
  "inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-foreground/25 text-sm hover:bg-foreground/10 transition-colors cursor-pointer";

export default function Contact() {
  return (
    <div className="w-full px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8 pb-10">
      <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">Get in touch</h1>
      <p className="text-[15px] leading-relaxed text-foreground/85 mt-2 max-w-[60ch]">
        Email is the fastest way to reach me. You can also send a message here and it&apos;ll land in my inbox.
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-4 rounded-xl border border-foreground/15 bg-foreground/[0.03] p-3 max-w-md">
        <span className="font-mono text-sm mr-auto break-all">{EMAIL}</span>
        {/* One unit, so the buttons wrap together rather than splitting across lines. */}
        <div className="flex gap-2">
          <CopyButton value={EMAIL} label="Copy" className={pill} />
          <a href={`mailto:${EMAIL}`} className={pill}>
            <Mail aria-hidden="true" className="w-4 h-4" /> Email
          </a>
        </div>
      </div>

      <div className="mt-8 max-w-md">
        <ContactForm />
      </div>
    </div>
  );
}
