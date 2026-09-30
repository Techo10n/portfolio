# portfolio

My personal website: a desktop-OS-style portfolio where each section (About, Projects, Resume, Contact, Terminal) opens as its own window. Windows tile, resize, minimize to the taskbar, and maximize.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Resend (contact form), Playwright

## Running locally

Requires Node 22 (see `.node-version`).

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

Without `RESEND_API_KEY`, `/api/contact` returns a 500 and the form shows an error.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm test          # Playwright, desktop + mobile, against a production build
```

`npm test` builds the app and serves it on port 3100 with Resend pointed at a local mock
(`tests/mock-resend.mjs`), so tests never send real email. First run: `npx playwright install chromium`.

## Layout

```
app/page.tsx              server-rendered shell; hands each program to the desktop
app/programs/             window contents: About, Projects, Resume, Contact, Terminal
components/desktop/       window manager: state reducer, tiling layout, window chrome, separators
app/api/contact/          contact form endpoint (validation, honeypot, rate limit, Resend)
lib/contact-schema.ts     zod schema shared by the form and the API
lib/site.ts               name, tagline, description, and canonical URL
```

## Updating the resume

Replace `public/resume.pdf`, then run `npm run resume:preview` (macOS) to regenerate the preview image shown in the Resume window.

Set `SITE_URL` in production for canonical and Open Graph URLs (Vercel's production domain is used automatically).
