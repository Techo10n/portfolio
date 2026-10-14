import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";

const EMAIL = "zechariahfrierson@gmail.com";

// Labeled pills when the row has room; icon-only circles when the labels would force a wrap.
const button =
  "flex items-center justify-center gap-1.5 h-8 w-8 @min-[28rem]:w-auto @min-[28rem]:px-3 shrink-0 rounded-full border border-foreground/25 text-sm hover:bg-foreground/10 transition-colors cursor-pointer";
const label = "sr-only @min-[28rem]:not-sr-only";

export default function Contact() {
  return (
    <div className="w-full px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8 pb-10">
      <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">Get in touch</h1>
      <p className="text-[15px] leading-relaxed text-foreground/85 mt-2 max-w-[60ch]">
        Email is the fastest way to reach me. You can also send a message here and it&apos;ll land in my inbox.
      </p>

      <div className="@container mt-4 max-w-md">
        <div className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-foreground/[0.03] p-3">
          {/* If it has to wrap, wrap after the @ rather than mid-word. */}
          <span className="font-mono text-sm min-w-0 flex-1 [overflow-wrap:anywhere]">
            {EMAIL.split("@")[0]}@<wbr />
            {EMAIL.split("@")[1]}
          </span>
          <CopyButton value={EMAIL} label="Copy" className={button} labelClassName={label} />
          <a href={`mailto:${EMAIL}`} title="Send an email" className={button}>
            <Mail aria-hidden="true" className="w-4 h-4" />
            <span className={label}>Email</span>
          </a>
        </div>
      </div>

      <div className="mt-8 max-w-md">
        <ContactForm />
      </div>
    </div>
  );
}
