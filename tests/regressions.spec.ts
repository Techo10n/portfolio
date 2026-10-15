import type { Locator } from "@playwright/test";
import { expect, test } from "./fixtures";
import { openApp, win } from "./helpers";

/** WCAG contrast between an element's text colour and the first opaque-ish background behind it. */
async function textContrast(text: Locator, background: Locator) {
  const [fg, bg] = [
    await text.evaluate((el) => getComputedStyle(el).color),
    await background.evaluate((el) => getComputedStyle(el).backgroundColor),
  ];
  return text.page().evaluate(
    ([fg, bg]) => {
      // Normalise any CSS colour (oklch, color-mix, …) to sRGB by painting it.
      const ctx = document.createElement("canvas").getContext("2d")!;
      const rgba = (c: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, 1, 1);
        return Array.from(ctx.getImageData(0, 0, 1, 1).data);
      };
      const lum = ([r, g, b]: number[]) => {
        const f = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const [l1, l2] = [lum(rgba(fg)), lum(rgba(bg))].sort((a, b) => b - a);
      return (l1 + 0.05) / (l2 + 0.05);
    },
    [fg, bg] as const,
  );
}

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme });

    test("project card text is readable", async ({ page, isMobile }) => {
      await page.goto("/");
      await openApp(page, "Projects", isMobile);
      const card = win(page, "Projects").getByRole("article").filter({ hasText: "EmpAIthetic" });
      const heading = card.getByRole("heading", { name: "EmpAIthetic" });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      expect(await textContrast(heading, card)).toBeGreaterThan(7);
    });
  });
}

test("terminal scrolls to the prompt as output grows", async ({ page, isMobile }) => {
  await page.goto("/");
  await openApp(page, "Terminal", isMobile);
  const input = win(page, "Terminal").getByRole("textbox", { name: "Terminal input" });
  for (let i = 0; i < 6; i++) {
    await input.fill("help");
    await input.press("Enter");
  }
  await expect(input).toBeInViewport();
});

test("wrapped terminal rows continue under their text column", async ({ page, isMobile }) => {
  test.skip(!isMobile, "rows only wrap at phone width");
  await page.goto("/");
  await openApp(page, "Terminal", isMobile);
  const input = win(page, "Terminal").getByRole("textbox", { name: "Terminal input" });
  await input.fill("projects");
  await input.press("Enter");
  const row = win(page, "Terminal").getByText("Finds the songs in any Instagram reel");
  const { starts, column } = await row.evaluate((el) => {
    const text = el.firstChild!;
    const range = document.createRange();
    range.selectNodeContents(text);
    // Leftmost x of each visual line.
    const byLine = new Map<number, number>();
    for (const r of range.getClientRects()) {
      const top = Math.round(r.top);
      byLine.set(top, Math.min(byLine.get(top) ?? Infinity, Math.round(r.left)));
    }
    const at = text.textContent!.indexOf("Finds");
    range.setStart(text, at);
    range.setEnd(text, at + 1);
    return { starts: [...byLine.values()], column: Math.round(range.getBoundingClientRect().left) };
  });
  expect(starts.length).toBeGreaterThan(1);
  for (const left of starts.slice(1)) expect(Math.abs(left - column)).toBeLessThanOrEqual(1);
});

test.describe("desktop only", () => {
  test.skip(({ isMobile }) => isMobile, "window sizing is desktop-only");

  test("project grid responds to the window's width, not the viewport's", async ({ page }) => {
    await page.goto("/projects");
    const section = win(page, "Projects").getByRole("region", { name: "Personal Projects" });
    const cards = section.getByRole("article");
    // The 980px window fits two columns, so the section's third card wraps even on a wide screen.
    const [a, c] = [(await cards.nth(0).boundingBox())!, (await cards.nth(2).boundingBox())!];
    expect(c.y).toBeGreaterThan(a.y);
  });
});
