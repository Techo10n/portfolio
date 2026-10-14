The official website of Big Data Big Impact (BDBI), Georgia Tech's data-science club. As the club's Digital Resources Manager, I rebuilt it from Angular to React and Next.js, moved it to Vercel, and I still maintain it every semester.

## Overview

BDBI runs student data-science project teams and workshops, and the website is how the club recruits members and shows its work to students and industry guests. It covers what the club does, its project teams, the board, testimonials, an FAQ, an embedded event calendar, a contact form, and an RSVP page for Demo Day.

The site belongs to the club, not to me. It's maintained by whoever holds the Digital Resources Manager seat on the board. I hold that seat, so the site is mine to build and keep current.

## My role

I've been the site's developer since I took the role in August 2025. I did the port off the old Angular site, the redesign, the deployment, and the ongoing maintenance. Commits in the repo are almost all mine. The board provides the content: rosters, project details, events, and photos.

## What I built

- **The Next.js rebuild.** I ported the existing Angular site to Next.js with the App Router, TypeScript, and Tailwind. Then I redesigned it section by section: navbar, hero, mission, projects, FAQs, calendar, testimonials, and the about page. I launched it on Vercel in October 2025.
- **Pages.** A one-page landing site (benefits, projects, testimonials, FAQs, calendar), an about page with the full board, a projects gallery with a detail page for each project, a contact page, and `/rsvp`.
- **Contact form.** Messages are sent by email through Resend.
- **Demo Day RSVP.** Industry guests RSVP on a form. Each response is added as a row in a Google Sheet, which the board can sort, filter, and use for check-in on the day, and then Resend emails a notification. The sheet is the source of truth, so if the email fails, the RSVP is still saved.
- **Seasonal banners.** A dismissible announcement banner for things like Demo Day and kickoff meetings. When an event passes, the banner is switched off rather than deleted, so the next event is just a copy edit.
- **Performance work.** I optimised images and loading, including converting the site's images to WebP.

## How it works

There's no CMS. Every project, board member, testimonial, and FAQ is a typed TypeScript literal in `app/lib/`. This means every change is versioned, a missing field is caught at build time, and there's no extra account to hand over when the board changes each year. Project pages get their leads from the board roster instead of keeping their own list, so updating the about page updates every project page too.

Both API routes keep working without credentials. Without email set up, the contact form logs to the console. Without Sheets set up, the RSVP form tells guests to email the club. That way a future maintainer can clone the repo and run it right away. The Resend and Google Sheets SDKs are imported inside the request handler, which keeps the large `googleapis` package out of the serverless bundle until it's needed.

## Tech stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS, `lucide-react`
- `react-hook-form` + `zod`
- Resend (email)
- Google Sheets API (RSVP storage)
- Vercel

## Outcome

The site is live at [gtbigdatabigimpact.com](https://gtbigdatabigimpact.com). It changes every semester: the board roster turns over, projects come and go, and Demo Day comes back with a new date. I've kept it up to date through Spring and Fall 2026, including upgrading it to Next.js 16.
