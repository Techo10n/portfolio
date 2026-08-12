# 🔍 Website Audit Report: Zechariah Frierson Portfolio

**Date:** April 2026
**Target:** Next.js Portfolio Project
**Methodology:** Comprehensive Code Review & Static Analysis
*(Note: A live browser test was attempted, but the Next.js 16.1.6 dev server currently deadlocks silently on Node 23 in this local environment. The audit below is based on a deep architectural and code-level inspection.)*

---

## 📑 Summary
The portfolio implements a highly creative, desktop-OS metaphor featuring a taskbar, windowed content, and resizable layout panels. The visual aesthetics (glassmorphism, `oklch` color space, dark/light modes) are modern and premium. However, the unique window-management architecture introduces notable challenges in mobile responsiveness, accessibility, and client-side performance. 

---

## ⚡ Performance Analysis

**1. Icon Library Bloat**
- **Issue:** The project imports icons from four different libraries: `lucide-react`, `react-icons`, `simple-icons`, and `simple-line-icons`. This significantly bloats the JavaScript bundle size.
- **Recommendation:** Standardize on a single icon library (e.g., `lucide-react`) and remove the others from `package.json`. If specific brand icons are needed, use custom SVG imports.

**2. Client Component Overhead**
- **Issue:** The root `app/page.tsx` is entirely a Client Component (`"use client"`). Since it manages the state of all open windows (`showAbout`, `showProjects`, etc.) and renders the heavy `ResizablePanelGroup` logic, Next.js Server Components are underutilized.
- **Recommendation:** Move the window state management to URL query parameters (`?window=about&window=projects`). This allows the layout to be server-rendered and makes the user's specific workspace state shareable via URL.

**3. Unnecessary Memoization**
- **Issue:** In `app/page.tsx`, `useMemo` is used for `windowConfigs`. However, its dependency array contains all the state variables (`showAbout`, `showProjects`, etc.). Because it recalculates on every state change, the memoization provides no performance benefit and adds overhead.
- **Recommendation:** Remove `useMemo` or extract the window configurations outside the component and only map the `isOpen` state dynamically.

**4. Continuous Animations**
- **Issue:** The `animate-gradient-radial` runs infinitely for 30s in the background. While performant on modern GPUs, it drains battery on mobile devices.
- **Recommendation:** Wrap the animation in a `@media (prefers-reduced-motion: no-preference)` query to respect user system settings.

---

## 🎨 User Experience (UX) & Usability

**1. Mobile Window Clutter**
- **Issue:** The `ResizablePanelGroup` splits the screen proportionally when multiple windows are open. On small screens (mobile), having 3 or 4 windows open simultaneously will render the content completely illegible due to lack of space.
- **Recommendation:** On mobile viewports (`< 768px`), restrict the UI to displaying only one active window at a time, or switch from a split-pane layout to a tabbed interface.

**2. Hover States on Touch Devices**
- **Issue:** The `TaskBar` relies on `group-hover:block` to show tooltip labels. On touch devices, hover states can become "sticky" or block clicks, leading to a frustrating experience.
- **Recommendation:** Disable hover tooltips on touch devices using Tailwind's `hover:hover` media query, or just rely on the easily recognizable icons.

**3. Incomplete Content Placeholders**
- **Issue:** `app/programs/Projects.tsx` contains several unfinished sections with `{/* description here */}` (e.g., SimpliEarn, JourneyJar, GameLogs).
- **Recommendation:** Complete the copy for these projects or hide them from the production build until they are ready.

**4. Terminal UX Improvements**
- **Issue:** The `Terminal.tsx` uses strict string matching (`trimmedCmd === "clear"`). If a user accidentally types `"clear "`, it might fail. Furthermore, clicking anywhere inside the terminal window should refocus the input.
- **Recommendation:** Improve command parsing logic and ensure the input retains focus reliably when interacting with the terminal panel.

---

## ♿ Accessibility (a11y)

**1. Invalid HTML Structure**
- **Issue:** In `About.tsx` (Line ~68), social links are structured as `<button> <a href="...">...</a> </button>`. Nesting interactive elements is invalid HTML, fails validation, and confuses screen readers.
- **Recommendation:** Remove the wrapping `<button>` and apply the button styling directly to the `<a>` tag.

**2. Dead Buttons in Projects**
- **Issue:** `Projects.tsx` has multiple "View Demo" and "Source Code" buttons that are `button` elements without `onClick` handlers or `href` attributes.
- **Recommendation:** Change these to `<a>` elements with appropriate `href` links, or disable/hide them if the links do not exist yet. 

**3. Taskbar ARIA Labels**
- **Positive Note:** The `TaskBar` buttons successfully use `aria-label={label}`, which is excellent for screen readers.

---

## 💻 Code Quality & Architecture

**1. CSS Color Space Consistency**
- **Positive Note:** The use of the `oklch` color space in `globals.css` ensures perceptually uniform colors and extremely modern, consistent theming. This is a best practice for modern design systems.

**2. Hydration Warnings**
- **Issue:** You correctly use `suppressHydrationWarning` on the `<html>` tag for `next-themes`, but you also have it on the root `<div>` in `page.tsx`.
- **Recommendation:** The warning on `<div>` is redundant and can be safely removed.

---

## 🛠️ Actionable Checklist
- [ ] Refactor `<button><a>...</a></button>` to just `<a>` in `About.tsx`.
- [ ] Remove unused or redundant icon libraries from `package.json`.
- [ ] Fill in missing descriptions in `Projects.tsx`.
- [ ] Add real URLs to the "View Demo" buttons in `Projects.tsx` (or convert them to `<a>` tags).
- [ ] Implement mobile-specific logic to prevent multiple windows from crushing the layout.
- [ ] Remove `useMemo` from `page.tsx` window configs.
