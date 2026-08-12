# Portfolio — Claude Code Instructions

## Read this first

**This repo is damaged by iCloud Drive.** Before doing any work here, read
`../vault/projects/portfolio/gotchas.md`.

Confirmed 2026-08-11: broken git refs (`refs/heads/main 2`), core git commands failing with
`fatal: mmap failed: Resource deadlock avoided`, several source files unreadable with `EDEADLK`, and
86 duplicate `* 2` entries — including `app/page 2.tsx` sitting beside `app/page.tsx`.

Do not trust a build, a `git log`, or a commit from this working tree until that's cleaned up.

```bash
git fsck
git branch -a
find . -name "* 2" -o -name "* 2.*"
```

## Getting up to speed

`../vault/projects/portfolio/index.md` routes to the architecture page. The site is a desktop-OS
metaphor: `app/page.tsx` is the desktop, `WindowWrapper` provides window chrome, and each file under
`app/programs/` is a window's contents.

Note: several vault claims about this repo are marked `> ASSUMPTION:` because the source files
couldn't be read during ingest. Verify before relying on them, and correct the vault when you do.

## Working here

- **Light mode is supported here** and has broken before. Check both themes on any styling change —
  the dark-only assumption from the other projects does not apply.
- The contact form needs `RESEND_API_KEY`; without it the route returns a 500 and the form silently
  fails in local dev.

## Keeping the vault current

Claude Code is the vault's only writer. Before writing to it, read `../vault/CLAUDE.md`.

**Standing rule:** when you fix a bug, make a design decision, or discover a wrong assumption, record
it in `../vault/projects/portfolio/gotchas.md` before the work is done, then append to
`../vault/log.md`. `/kb-update` does both.
