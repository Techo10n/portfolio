EmpAIthetic is an AI journaling companion that gives people a judgment-free place to write about how they feel and get an empathetic, reflective response. My team and I built it at HackGT 11 in September 2024. It was our first hackathon.

## Overview

When we formed our team, we didn't know each other. We were freshmen and sophomores trying to enjoy our first hackathon, unsure what we wanted to make or what each of us could build. By the end of the first night we'd decided that human connection was a problem worth working on.

Many people dealing with mental health challenges are caught in a paradox. They don't feel comfortable sharing their thoughts with another person, but keeping everything to themselves leaves them isolated. That isolation makes the struggle worse.

EmpAIthetic tries to break that cycle. Users write journal entries, and an AI reads them and responds with empathy and curiosity, so they feel heard without the vulnerability of opening up to a person. Whether someone is venting in the middle of the night or journaling to manage daily stress, it lowers the barrier to expressing emotions.

## My role

I set up the project and built most of the frontend. I also wrote the first AI integration and handled the final merge and deployment. Most of the repo's commits are mine. My teammates built other key parts: one added Firebase and the database layer, and another built the journal history page, the user data structure, and the navbar profile, and refined the AI prompt.

## What I built

- **Home page and journaling UI.** The main entry screen, with the input, header, and hover and underline styling.
- **Firebase on the frontend.** Google sign-in wired into the header, plus the login and profile pages, built on my teammate's Firebase setup.
- **AI integration.** The first version of the Flask backend and the call to it from the journal page.
- **Merging and shipping.** I merged the database and UI work, brought the frontend and backend together, and deployed the app to Vercel. That took several tries during the final hours.

## How it works

The Next.js frontend sends what the user writes to a Flask endpoint. The endpoint calls OpenAI's `gpt-4o-mini` with a system prompt. The prompt casts the model as a listener: no first-person responses; short, reflective encouragement with open-ended questions and gentle suggestions; and drawing on what the user has already said. It also asks the model to end each reply by quoting the exact words from the entry it was responding to, so users can see what was heard.

Firebase provides Google authentication and stores users' entries in Firestore. The history page lists past entries.

## Tech stack

- Next.js 14, React, TypeScript
- Tailwind CSS
- Firebase (Auth + Firestore)
- Flask (Python)
- OpenAI `gpt-4o-mini`
- Vercel

## Outcome

Our team of four shipped a working app by the end of HackGT 11. We didn't place in any track. Watch the [demo video](https://www.youtube.com/watch?v=G2bBY3_221M), or see the source at [github.com/Techo10n/shaz](https://github.com/Techo10n/shaz).

