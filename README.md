# portfolio

> [!NOTE]
> **Work in progress, and the content is out of date.** The site is still being built, and the About, Projects, and Resume sections reflect 2025. A content refresh is coming soon.

My personal website: a desktop-OS-style portfolio where each section (About, Projects, Resume, Contact, Terminal) opens as its own resizable window.

**Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Resend (contact form)

## Running locally

```bash
npm install
npm run dev   # http://localhost:3000
```

The contact form needs `RESEND_API_KEY` in `.env.local`. Without it, `/api/contact` returns a 500.
