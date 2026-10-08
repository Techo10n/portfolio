import type { Page } from "@playwright/test";

export const win = (page: Page, title: string) => page.getByRole("region", { name: title, exact: true });

const TAB_BAR = ["About", "Projects", "Experience", "Resume", "Contact"];

/**
 * Opens an app the way a visitor would: the dock on desktop, the tab bar on phones.
 * Terminal isn't in the phone tab bar, so on phones it goes via the home screen.
 */
export async function openApp(page: Page, label: string, isMobile: boolean) {
  if (!isMobile) {
    await page.getByRole("navigation", { name: "Dock" }).getByRole("button", { name: label, exact: true }).click();
  } else if (TAB_BAR.includes(label)) {
    await page.getByRole("navigation", { name: "Sections" }).getByRole("button", { name: label, exact: true }).click();
  } else {
    // Not in the tab bar: go home (closing the open app), then tap its home-screen icon.
    // Let any close animation finish first, or a window that's on its way out still looks open.
    await page.waitForFunction(() => !document.querySelector(".animate-out"));
    const close = page.getByRole("region").getByRole("button", { name: "Close" }).filter({ visible: true });
    if (await close.count()) await close.first().click();
    await page.getByRole("navigation", { name: "Apps" }).getByRole("link", { name: label, exact: true }).click();
  }
}

export const box = async (page: Page, title: string) => (await win(page, title).boundingBox())!;
