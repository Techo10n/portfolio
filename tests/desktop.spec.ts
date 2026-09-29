import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const win = (page: Page, title: string) => page.getByRole("region", { name: title, exact: true });
const taskbar = (page: Page, label: string) =>
  page.getByRole("navigation", { name: "Taskbar" }).getByRole("button", { name: label, exact: true });

const box = async (locator: Locator) => (await locator.boundingBox())!;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("About is open and server-rendered on first load", async ({ page, request }) => {
  await expect(win(page, "About Me")).toBeVisible();
  await expect(win(page, "About Me").getByRole("heading", { name: "Zechariah Frierson" })).toBeVisible();

  const html = await (await request.get("/")).text();
  expect(html).toContain("Zechariah Frierson");
  expect(html).toContain("What I Work With");
});

test("taskbar opens every program", async ({ page }) => {
  for (const [label, title] of [
    ["Projects", "My Projects"],
    ["Resume", "My Resume"],
    ["Contact", "Contact"],
    ["Terminal", "Terminal"],
  ] as const) {
    await taskbar(page, label).click();
    await expect(win(page, title)).toBeVisible();
  }
});

test("close removes the window", async ({ page }) => {
  await win(page, "About Me").getByRole("button", { name: "Close" }).click();
  await expect(win(page, "About Me")).toHaveCount(0);
  await expect(taskbar(page, "About Me")).toHaveAttribute("data-status", "closed");
});

test("minimize sends the window to the taskbar and restores it", async ({ page }) => {
  await win(page, "About Me").getByRole("button", { name: "Minimize" }).click();
  await expect(win(page, "About Me")).toBeHidden();
  await expect(taskbar(page, "About Me")).toHaveAttribute("data-status", "minimized");

  await taskbar(page, "About Me").click();
  await expect(win(page, "About Me")).toBeVisible();
  await expect(taskbar(page, "About Me")).toHaveAttribute("data-status", "open");
});

test("terminal keeps its history when the layout changes", async ({ page }) => {
  await taskbar(page, "Terminal").click();
  const input = win(page, "Terminal").getByRole("textbox", { name: "Terminal input" });
  await input.fill("whoami");
  await input.press("Enter");
  await expect(win(page, "Terminal")).toContainText("guest@zechariah-portfolio");

  await taskbar(page, "Projects").click();
  await taskbar(page, "Resume").click();
  await taskbar(page, "Terminal").click();
  await expect(win(page, "Terminal")).toContainText("guest@zechariah-portfolio");
});

test.describe("desktop only", () => {
  test.skip(({ isMobile }) => isMobile, "maximize and split layout are desktop features");

  test("windows share the desktop side by side", async ({ page }) => {
    await taskbar(page, "Projects").click();
    await expect
      .poll(async () => {
        const [about, projects] = [await box(win(page, "About Me")), await box(win(page, "My Projects"))];
        return about.x + about.width <= projects.x && Math.abs(about.width - projects.width) < 2;
      })
      .toBe(true);
  });

  test("maximize fills the desktop and restore brings back the split", async ({ page }) => {
    await taskbar(page, "Projects").click();
    await win(page, "About Me").getByRole("button", { name: "Maximize" }).click();
    await expect(win(page, "My Projects")).toBeHidden();
    const desktop = await box(page.getByRole("main"));
    await expect
      .poll(async () => (await box(win(page, "About Me"))).width)
      .toBeGreaterThan(desktop.width - 2);

    await win(page, "About Me").getByRole("button", { name: "Restore" }).click();
    await expect(win(page, "My Projects")).toBeVisible();
  });

  test("separator resizes neighbouring windows with the keyboard", async ({ page }) => {
    await taskbar(page, "Projects").click();
    const desktop = await box(page.getByRole("main"));
    await expect.poll(async () => (await box(win(page, "About Me"))).width).toBeLessThan(desktop.width / 2);
    const before = (await box(win(page, "About Me"))).width;
    const separator = page.getByRole("separator").first();
    await separator.focus();
    await separator.press("ArrowRight");
    await separator.press("ArrowRight");
    await expect.poll(async () => (await box(win(page, "About Me"))).width).toBeGreaterThan(before + 20);
  });
});

test.describe("mobile only", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile shows one window at a time");

  test("opening a program shows only that window", async ({ page }) => {
    await taskbar(page, "Projects").click();
    await expect(win(page, "My Projects")).toBeVisible();
    await expect(win(page, "About Me")).toBeHidden();
    await expect(win(page, "My Projects").getByRole("button", { name: "Maximize" })).toBeHidden();
  });
});

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`starting in ${colorScheme}`, () => {
    test.use({ colorScheme });

    test("theme toggle switches to the other theme on the first click", async ({ page }) => {
      const html = page.locator("html");
      const [from, to] = colorScheme === "dark" ? [/\bdark\b/, /\blight\b/] : [/\blight\b/, /\bdark\b/];
      await expect(html).toHaveClass(from);
      await page.getByRole("button", { name: "Toggle theme" }).click();
      await expect(html).toHaveClass(to);
    });
  });
}

test("terminal clear empties the output", async ({ page }) => {
  await taskbar(page, "Terminal").click();
  const terminal = win(page, "Terminal");
  const input = terminal.getByRole("textbox", { name: "Terminal input" });
  await input.fill("help");
  await input.press("Enter");
  await expect(terminal).toContainText("Available commands:");
  await input.fill("clear");
  await input.press("Enter");
  await expect(terminal).not.toContainText("Available commands:");
  await expect(terminal).not.toContainText("Welcome to Zechariah's Portfolio Terminal!");
});
