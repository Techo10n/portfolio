A prototype marketing site for Inland Octopus, a toy and novelty store in Walla Walla, Washington. The site is built around a hand-composed illustrated scene with procedurally generated clouds, and everything is hand-built in Next.js with no template or UI library.

## Overview

The home page is a scene: hills, a rainbow, the store front, and drifting clouds, with the store's product categories presented as cards. A second page covers gift certificates. The navbar links between the two pages and out to the store's Instagram and Facebook.

## What I built

- **An illustrated hero scene.** The home page places illustrated layers (rainbow, hills, store front, category cards, decorative lines, a badge) with absolute positioning and animates them with `framer-motion`. Most of the work was art direction: tuning positions and sizes until the composition held together, such as stretching the hills and rainbow to fill the screen width.
- **Procedural clouds.** Instead of drawing cloud images, a `ProceduralCloud` component draws each cloud on a `<canvas>`. A seeded random number generator makes every cloud look different while staying the same across renders and rebuilds. Particles are placed with a Gaussian distribution (Box–Muller), so they cluster in the middle and thin out at the edges, which is what makes the shape look like a cloud and not a pile of circles. Props control size, colour, seed and "fluffiness." Because the output is deterministic and drawing is expensive, each cloud renders once and is memoised.
- **Hover interactions.** Category cards tilt slightly on hover, and the badge spins only while you hover over it.
- **An embedded map** showing the store's location.
- **A gift certificates page.**
- **A separate mobile design** for both pages and the navbar, instead of letting the desktop layout collapse.

## Design

Canvas clouds scale without pixelation, add nothing to the bundle size, and one component produces many distinct clouds. The pieces that need a hand-drawn look (the rainbow, hills and store front) stay as illustrated images. The tradeoff of composing a scene this way is that responsive behaviour costs more effort, which is why mobile got its own layout.

## Tech

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · framer-motion · Canvas 2D · Vercel.

## Status

This is a prototype. It is deployed at [inland-octopus.vercel.app](https://inland-octopus.vercel.app), not on the store's own domain. Source: [github.com/Techo10n/inland-octopus](https://github.com/Techo10n/inland-octopus).
