import { existsSync } from "node:fs";
import { expect, test } from "./fixtures";
import { openApp, win } from "./helpers";
import { mediaFor } from "../content/media";
import { PROJECT_SLUGS, PROJECTS } from "../content/projects";

test("every project has a written case study", ({ isMobile }) => {
  test.skip(isMobile, "file check; one project is enough");
  const missing = PROJECT_SLUGS.filter((slug) => !existsSync(`content/case-studies/${slug}.md`));
  expect(missing).toEqual([]);
});

test("every project image in the media list exists", ({ isMobile }) => {
  test.skip(isMobile, "file check; one project is enough");
  const paths = PROJECT_SLUGS.flatMap((slug) => {
    const media = mediaFor(slug);
    return media ? [media.cover, ...(media.gallery ?? []).map((g) => g.src)].filter(Boolean) : [];
  });
  expect(paths.length).toBeGreaterThan(0);
  expect(paths.filter((src) => !existsSync(`public${src}`))).toEqual([]);
});

test("clicking a project card opens its case study in its own window", async ({ page, isMobile }) => {
  await page.goto("/");
  await openApp(page, "Projects", isMobile);
  await win(page, "Projects").getByRole("link", { name: "EcoShelf", exact: true }).click();

  const study = win(page, "EcoShelf");
  await expect(study).toBeVisible();
  await expect(page).toHaveURL(/\/projects\/ecoshelf$/);
  await expect(page).toHaveTitle(/^EcoShelf · /);
  await expect(study.getByRole("heading", { name: "Status" })).toBeVisible();
  // Card links still go to their own destination, in a new tab, not to the case study.
  await expect(study.getByRole("link", { name: "GitHub" })).toHaveAttribute("target", "_blank");

  if (isMobile) {
    // Phones: closing a case study goes back to Projects.
    await study.getByRole("button", { name: "Close" }).click();
    await expect(win(page, "Projects")).toBeVisible();
  } else {
    // Desktop: it shows in the dock while it's open.
    await expect(page.getByRole("navigation", { name: "Dock" }).getByRole("button", { name: "EcoShelf" })).toBeVisible();
    await study.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("navigation", { name: "Dock" }).getByRole("button", { name: "EcoShelf" })).toHaveCount(0);
  }
});

test("a card's own links sit above the case-study link", async ({ page }) => {
  await page.goto("/projects");
  const card = win(page, "Projects").getByRole("article").filter({ hasText: "EcoShelf" });
  const source = card.getByRole("link", { name: "Source Code" });
  await source.scrollIntoViewIfNeeded();
  const box = (await source.boundingBox())!;
  const hit = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest("a")?.textContent, [
    box.x + box.width / 2,
    box.y + box.height / 2,
  ]);
  expect(hit).toContain("Source Code");
});

test("case studies load directly from their URL", async ({ page, request }) => {
  for (const slug of ["vip-drone-detection", "blue-mountain-law"] as const) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(win(page, PROJECTS[slug].title)).toBeVisible();
  }
  expect((await request.get("/projects/not-a-project")).status()).toBe(404);
});

test("gallery images open large and step through with the arrow keys", async ({ page }) => {
  await page.goto("/projects/museaic");
  const study = win(page, "Museaic");
  const thumbs = study.getByRole("button", { name: /^View larger/ });
  await thumbs.first().scrollIntoViewIfNeeded();
  await thumbs.first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/^1 \/ \d+$/)).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText(/^2 \/ \d+$/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("the featured card scrolls through all of its images, each shown once to screen readers", async ({ page }) => {
  await page.goto("/projects");
  const featured = win(page, "Projects").getByRole("article").first();
  const images = featured.getByRole("img");
  const slides = featured.locator(".animate-marquee > li");
  const count = await slides.count();
  expect(count).toBeGreaterThan(2);
  // Rendered twice for the loop; the copies are hidden from assistive tech.
  await expect(images).toHaveCount(count / 2);
});
