import { expect, test } from "./fixtures";

test.skip(({ isMobile }) => isMobile, "metadata is viewport-independent");

test("page has title, description, canonical, and social cards", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Zechariah Frierson/);
  const meta = (selector: string) => page.locator(selector).first().getAttribute("content");
  expect(await meta('meta[name="description"]')).toBeTruthy();
  expect(await meta('meta[property="og:title"]')).toBe("Zechariah Frierson");
  expect(await meta('meta[name="twitter:card"]')).toBe("summary_large_image");
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(/^https?:\/\//);
});

test("social preview image is a 1200x630 PNG", async ({ page, request }) => {
  await page.goto("/");
  const src = await page.locator('meta[property="og:image"]').first().getAttribute("content");
  expect(src).toBeTruthy();
  const res = await request.get(new URL(src!).pathname + new URL(src!).search);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");
  const png = await res.body();
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
});

test("icons resolve", async ({ page, request }) => {
  await page.goto("/");
  for (const rel of ["icon", "apple-touch-icon"]) {
    const href = await page.locator(`link[rel="${rel}"]`).first().getAttribute("href");
    expect(href, rel).toBeTruthy();
    expect((await request.get(href!)).status(), rel).toBe(200);
  }
});

test("robots.txt and sitemap.xml are served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<urlset");
});

test("each window page has its own title and canonical URL", async ({ page }) => {
  await page.goto("/projects");
  await expect(page).toHaveTitle("Projects · Zechariah Frierson");
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(/\/projects$/);
  expect(await page.locator('meta[property="og:image"]').first().getAttribute("content")).toBeTruthy();
});

test("sitemap lists every window", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const path of ["/projects", "/experience", "/resume", "/contact", "/terminal"]) expect(xml).toContain(path);
});
