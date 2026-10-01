import { expect, test } from "./fixtures";
import { box, openApp, win } from "./helpers";

/** The area windows live in (the desktop minus the icon column). */
const stage = async (page: import("@playwright/test").Page) =>
  (await page.locator("#desktop > div.absolute").boundingBox())!;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("About is open and server-rendered on first load", async ({ page, request }) => {
  await expect(win(page, "About Me")).toBeVisible();
  await expect(win(page, "About Me").getByRole("heading", { name: "Zechariah Frierson" })).toBeVisible();
  const html = await (await request.get("/")).text();
  for (const text of ["Software Engineer", "Class of 2028", "Highlights", "Capital One"]) expect(html).toContain(text);
});

test("every app opens its window, URL, and title", async ({ page, isMobile }) => {
  for (const [label, title, path] of [
    ["Projects", "Projects", "/projects"],
    ["Experience", "Experience", "/experience"],
    ["Resume", "Resume", "/resume"],
    ["Contact", "Contact", "/contact"],
    ["Terminal", "Terminal", "/terminal"],
  ] as const) {
    await openApp(page, label, isMobile);
    await expect(win(page, title)).toBeVisible();
    await expect(page).toHaveURL(path);
    await expect(page).toHaveTitle(`${title} · Zechariah Frierson`);
  }
});

test("each window has a real page that deep-links to it", async ({ page, request }) => {
  for (const path of ["/projects", "/experience", "/resume", "/contact", "/terminal"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  for (const path of ["/nope", "/projects/extra"]) expect((await request.get(path)).status(), path).toBe(404);
  const about = await request.get("/about", { maxRedirects: 0 });
  expect(about.status()).toBe(308);
  expect(about.headers()["location"]).toBe("/");
  await page.goto("/experience");
  await expect(win(page, "Experience")).toBeVisible();
  await expect(win(page, "Experience").getByRole("heading", { name: "Software Engineering Intern" })).toBeVisible();
});

test("Back returns to the previous window", async ({ page, isMobile }) => {
  await openApp(page, "Projects", isMobile);
  await openApp(page, "Resume", isMobile);
  await page.goBack();
  await expect(page).toHaveURL("/projects");
  await expect(win(page, "Projects")).toBeVisible();
});

test("About's buttons open the other windows", async ({ page }) => {
  await win(page, "About Me").getByRole("link", { name: "View projects" }).click();
  await expect(win(page, "Projects")).toBeVisible();
  await expect(page).toHaveURL("/projects");
});

test("close removes the window", async ({ page }) => {
  await win(page, "About Me").getByRole("button", { name: "Close" }).click();
  await expect(win(page, "About Me")).toHaveCount(0);
});

test("terminal keeps its history while other windows come and go", async ({ page, isMobile }) => {
  await openApp(page, "Terminal", isMobile);
  const input = win(page, "Terminal").getByRole("textbox", { name: "Terminal input" });
  await input.fill("whoami");
  await input.press("Enter");
  await expect(win(page, "Terminal")).toContainText("guest@zechariah-portfolio");

  await openApp(page, "Projects", isMobile);
  await openApp(page, "Resume", isMobile);
  await win(page, "Resume").getByRole("button", { name: "Close" }).click();
  await openApp(page, "Terminal", isMobile);
  await expect(win(page, "Terminal")).toContainText("guest@zechariah-portfolio");
});

test("terminal can open windows", async ({ page, isMobile }) => {
  await openApp(page, "Terminal", isMobile);
  const input = win(page, "Terminal").getByRole("textbox", { name: "Terminal input" });
  await input.fill("open projects");
  await input.press("Enter");
  await expect(win(page, "Projects")).toBeVisible();
  await expect(page).toHaveURL("/projects");
});

test("terminal clear empties the output", async ({ page, isMobile }) => {
  await openApp(page, "Terminal", isMobile);
  const terminal = win(page, "Terminal");
  const input = terminal.getByRole("textbox", { name: "Terminal input" });
  await input.fill("help");
  await input.press("Enter");
  await expect(terminal).toContainText("Available commands:");
  await input.fill("clear");
  await input.press("Enter");
  await expect(terminal).not.toContainText("Available commands:");
});

test("unknown URLs get a real 404 page", async ({ page, consoleErrors }) => {
  const res = await page.goto("/definitely-not-a-window");
  expect(res!.status()).toBe(404);
  // The browser reports the document's own 404; that one is expected here, anything else isn't.
  const expected = consoleErrors.filter((m) => m.includes("status of 404"));
  expect(expected).toHaveLength(1);
  consoleErrors.splice(consoleErrors.indexOf(expected[0]), 1);
  await page.getByRole("link", { name: "Back to the desktop" }).click();
  await expect(win(page, "About Me")).toBeVisible();
});

test("first Tab reaches a skip link to the content", async ({ page }) => {
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
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

test.describe("desktop windows", () => {
  test.skip(({ isMobile }) => isMobile, "floating windows are a desktop feature");

  const taskbar = (page: import("@playwright/test").Page, title: string) =>
    page.getByRole("navigation", { name: "Open windows" }).getByRole("button", { name: title, exact: true });

  test("each window opens in its own spot, clear of the desktop icons", async ({ page }) => {
    for (const label of ["Projects", "Experience", "Resume", "Contact", "Terminal"]) await openApp(page, label, false);
    const titles = ["About Me", "Projects", "Experience", "Resume", "Contact", "Terminal"];
    const boxes = await Promise.all(titles.map((t) => box(page, t)));
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const apart = Math.abs(boxes[i].x - boxes[j].x) > 40 || Math.abs(boxes[i].y - boxes[j].y) > 40;
        expect(apart, `${titles[i]} vs ${titles[j]}`).toBe(true);
      }
    }
    const icons = (await page.getByRole("navigation", { name: "Apps" }).getByRole("list").boundingBox())!;
    for (const b of boxes) expect(b.x).toBeGreaterThanOrEqual(icons.x + icons.width);
  });

  test("dragging the title bar moves the window", async ({ page }) => {
    const before = await box(page, "About Me");
    await page.mouse.move(before.x + 200, before.y + 20);
    await page.mouse.down();
    await page.mouse.move(before.x + 320, before.y + 120, { steps: 6 });
    await page.mouse.up();
    const after = await box(page, "About Me");
    expect(Math.round(after.x - before.x)).toBe(120);
    expect(Math.round(after.y - before.y)).toBe(100);
  });

  test("dragging the corner resizes the window", async ({ page }) => {
    const before = await box(page, "About Me");
    await page.mouse.move(before.x + before.width - 3, before.y + before.height - 3);
    await page.mouse.down();
    await page.mouse.move(before.x + before.width - 203, before.y + before.height - 103, { steps: 6 });
    await page.mouse.up();
    const after = await box(page, "About Me");
    expect(Math.round(before.width - after.width)).toBe(200);
    expect(Math.round(before.height - after.height)).toBe(100);
  });

  test("clicking a window behind brings it to the front", async ({ page }) => {
    await openApp(page, "Projects", false);
    const z = (id: string) => page.locator(`#${id}-window`).evaluate((el) => Number(getComputedStyle(el.parentElement!).zIndex));
    expect(await z("projects")).toBeGreaterThan(await z("about"));
    const about = await box(page, "About Me");
    // Projects is cascaded 32px right of About, so click About's exposed left strip.
    await page.mouse.click(about.x + 12, about.y + 200);
    await expect.poll(async () => (await z("about")) > (await z("projects"))).toBe(true);
    await expect(page).toHaveURL("/");
  });

  test("minimize sends the window to the taskbar and restores it", async ({ page }) => {
    await win(page, "About Me").getByRole("button", { name: "Minimize" }).click();
    await expect(win(page, "About Me")).toBeHidden();
    await expect(taskbar(page, "About Me")).toHaveAttribute("data-status", "minimized");
    await taskbar(page, "About Me").click();
    await expect(win(page, "About Me")).toBeVisible();
    await expect(taskbar(page, "About Me")).toHaveAttribute("data-status", "open");
  });

  test("clicking the active window's taskbar button minimizes it", async ({ page }) => {
    await taskbar(page, "About Me").click();
    await expect(win(page, "About Me")).toBeHidden();
  });

  test("maximize fills the desktop; double-clicking the title bar restores", async ({ page }) => {
    const before = await box(page, "About Me");
    await win(page, "About Me").getByRole("button", { name: "Maximize" }).click();
    const desktop = await stage(page);
    await expect.poll(async () => (await box(page, "About Me")).height).toBeGreaterThan(desktop.height - 2);
    await win(page, "About Me").getByText("About Me", { exact: true }).dblclick();
    await expect.poll(async () => Math.round((await box(page, "About Me")).width)).toBe(Math.round(before.width));
  });

  test("resizing a maximized window makes it a normal window again", async ({ page }) => {
    await win(page, "About Me").getByRole("button", { name: "Maximize" }).click();
    const desktop = await stage(page);
    await expect.poll(async () => (await box(page, "About Me")).width).toBeGreaterThan(desktop.width - 2);
    const max = await box(page, "About Me");
    await page.mouse.move(max.x + max.width - 2, max.y + max.height - 2);
    await page.mouse.down();
    await page.mouse.move(max.x + max.width - 302, max.y + max.height - 202, { steps: 6 });
    await page.mouse.up();
    await expect(win(page, "About Me").getByRole("button", { name: "Maximize" })).toBeVisible();
    const after = await box(page, "About Me");
    expect(Math.round(max.width - after.width)).toBe(300);
  });

  test("dragging a maximized window out restores its size", async ({ page }) => {
    const normal = await box(page, "About Me");
    await win(page, "About Me").getByRole("button", { name: "Maximize" }).click();
    await expect(win(page, "About Me").getByRole("button", { name: "Restore" })).toBeVisible();
    const max = await box(page, "About Me");
    await page.mouse.move(max.x + max.width / 2, max.y + 20);
    await page.mouse.down();
    await page.mouse.move(max.x + max.width / 2, max.y + 220, { steps: 8 });
    await page.mouse.up();
    await expect.poll(async () => Math.round((await box(page, "About Me")).width)).toBe(Math.round(normal.width));
    await expect(win(page, "About Me").getByRole("button", { name: "Maximize" })).toBeVisible();
  });

  test("dragging to the left edge previews and snaps to the left half, then offers the other windows", async ({ page }) => {
    await openApp(page, "Projects", false);
    const desktop = await stage(page);
    const about = await box(page, "About Me");
    await page.mouse.click(about.x + 60, about.y + 20);
    await page.mouse.move(about.x + 60, about.y + 20);
    await page.mouse.down();
    await page.mouse.move(desktop.x + 2, desktop.y + desktop.height / 2, { steps: 10 });
    await expect(page.getByTestId("snap-preview")).toBeVisible();
    await page.mouse.up();
    await expect(page.getByTestId("snap-preview")).toHaveCount(0);

    await expect.poll(async () => {
      const b = await box(page, "About Me");
      return Math.abs(b.x - desktop.x) < 12 && Math.abs(b.width - desktop.width / 2) < 16 && b.height > desktop.height - 24;
    }).toBe(true);

    const picker = page.getByRole("dialog", { name: "Choose a window for the other half" });
    await expect(picker).toBeVisible();
    await picker.getByRole("button", { name: "Projects" }).click();
    await expect(picker).toBeHidden();
    await expect.poll(async () => {
      const b = await box(page, "Projects");
      return Math.abs(b.x + b.width - (desktop.x + desktop.width)) < 12 && Math.abs(b.width - desktop.width / 2) < 16;
    }).toBe(true);
  });

  test("Escape dismisses the window picker", async ({ page }) => {
    await openApp(page, "Projects", false);
    const desktop = await stage(page);
    const projects = await box(page, "Projects");
    await page.mouse.move(projects.x + 60, projects.y + 20);
    await page.mouse.down();
    await page.mouse.move(desktop.x + desktop.width - 2, desktop.y + desktop.height / 2, { steps: 10 });
    await page.mouse.up();
    const picker = page.getByRole("dialog", { name: "Choose a window for the other half" });
    await expect(picker).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(picker).toBeHidden();
  });

  test("dragging to the top maximizes; dragging a snapped window out restores its size", async ({ page }) => {
    const desktop = await stage(page);
    const normal = await box(page, "About Me");
    await page.mouse.move(normal.x + 60, normal.y + 20);
    await page.mouse.down();
    await page.mouse.move(desktop.x + desktop.width / 2, desktop.y + 2, { steps: 10 });
    await page.mouse.up();
    await expect(win(page, "About Me").getByRole("button", { name: "Restore" })).toBeVisible();

    // Snap to a quarter via the bottom-left corner, then pull it back out.
    const max = await box(page, "About Me");
    await page.mouse.move(max.x + 200, max.y + 20);
    await page.mouse.down();
    await page.mouse.move(desktop.x + 2, desktop.y + desktop.height - 2, { steps: 10 });
    await page.mouse.up();
    await expect.poll(async () => (await box(page, "About Me")).height).toBeLessThan(desktop.height / 2 + 4);
    const quarter = await box(page, "About Me");
    await page.mouse.move(quarter.x + 80, quarter.y + 20);
    await page.mouse.down();
    await page.mouse.move(quarter.x + 400, quarter.y - 150, { steps: 10 });
    await page.mouse.up();
    await expect.poll(async () => Math.round((await box(page, "About Me")).width)).toBe(Math.round(normal.width));
  });

  test("the taskbar stays above windows", async ({ page }) => {
    const about = await box(page, "About Me");
    await page.mouse.move(about.x + 200, about.y + 20);
    await page.mouse.down();
    await page.mouse.move(about.x + 200, about.y + 500, { steps: 6 });
    await page.mouse.up();
    await taskbar(page, "About Me").click();
    await expect(win(page, "About Me")).toBeHidden();
  });
});

test.describe("phone", () => {
  test.skip(({ isMobile }) => !isMobile, "phone layout");

  test("windows are full-screen, one at a time, with only a close button", async ({ page }) => {
    await openApp(page, "Projects", true);
    await expect(win(page, "Projects")).toBeVisible();
    await expect(win(page, "About Me")).toBeHidden();
    await expect(win(page, "Projects").getByRole("button", { name: "Maximize" })).toBeHidden();
    await expect(win(page, "Projects").getByRole("button", { name: "Minimize" })).toBeHidden();
    await expect(page.getByRole("navigation", { name: "Sections" }).getByRole("button", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("closing an app shows the home screen and keeps the app's state", async ({ page }) => {
    await openApp(page, "Contact", true);
    await win(page, "Contact").getByRole("textbox", { name: "Name" }).fill("Draft Person");
    await win(page, "Contact").getByRole("button", { name: "Close" }).click();
    const home = page.getByRole("navigation", { name: "Apps" });
    await expect(home.getByRole("link", { name: "Terminal" })).toBeVisible();
    await home.getByRole("link", { name: "Terminal" }).click();
    await expect(win(page, "Terminal")).toBeVisible();
    await openApp(page, "Contact", true);
    await expect(win(page, "Contact").getByRole("textbox", { name: "Name" })).toHaveValue("Draft Person");
  });
});
