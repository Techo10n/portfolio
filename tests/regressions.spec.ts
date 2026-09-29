import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const win = (page: Page, title: string) => page.getByRole("region", { name: title, exact: true });
const taskbar = (page: Page, label: string) =>
  page.getByRole("navigation", { name: "Taskbar" }).getByRole("button", { name: label, exact: true });

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

    test("project card text is readable over screenshots", async ({ page }) => {
      await page.goto("/");
      await taskbar(page, "Projects").click();
      const card = win(page, "My Projects").getByRole("article").filter({ hasText: "EmpAIthetic" });
      const heading = card.getByRole("heading", { name: "EmpAIthetic" });
      await expect(heading).toBeVisible();
      expect(await textContrast(heading, card.getByTestId("card-body"))).toBeGreaterThan(7);
    });
  });
}

test("terminal scrolls to the prompt as output grows", async ({ page }) => {
  await page.goto("/");
  await taskbar(page, "Terminal").click();
  const input = win(page, "Terminal").getByRole("textbox", { name: "Terminal input" });
  for (let i = 0; i < 6; i++) {
    await input.fill("help");
    await input.press("Enter");
  }
  await expect(input).toBeInViewport();
});

test.describe("desktop only", () => {
  test.skip(({ isMobile }) => isMobile, "split windows are desktop-only");

  test("project grid responds to the window's width, not the viewport's", async ({ page }) => {
    await page.goto("/");
    await taskbar(page, "Projects").click();
    await taskbar(page, "About Me").click();
    const cards = win(page, "My Projects").getByRole("article");
    // In a half-width window the first section's three cards cannot fit on one row.
    await expect
      .poll(async () => {
        const [a, c] = [(await cards.nth(0).boundingBox())!, (await cards.nth(2).boundingBox())!];
        return c.y > a.y;
      })
      .toBe(true);
  });
});
