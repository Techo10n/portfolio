import { expect, test } from "./fixtures";
import { formatRange } from "../lib/dates";

test("resume window links a real PDF and shows its preview", async ({ page, request }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Taskbar" }).getByRole("button", { name: "Resume", exact: true }).click();
  const resume = page.getByRole("region", { name: "My Resume", exact: true });

  const open = resume.getByRole("link", { name: "Open PDF" });
  await expect(open).toHaveAttribute("href", "/resume.pdf");
  const pdf = await request.get("/resume.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  await expect(resume.getByRole("link", { name: "Download" })).toHaveAttribute("download", /\.pdf$/);

  const preview = resume.getByRole("img", { name: /resume/i });
  // Lazy-loaded below the fold on small screens, so bring it into view first.
  await preview.scrollIntoViewIfNeeded();
  await expect(preview).toBeVisible();
  await expect.poll(() => preview.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
});

test.describe("formatRange", () => {
  test.skip(({ isMobile }) => isMobile, "pure function; one project is enough");

  test("counts months inclusively", () => {
    expect(formatRange("2026-06", "2026-08")).toBe("Jun 2026 – Aug 2026 · 3 mos");
    expect(formatRange("2022-12", "2024-06")).toBe("Dec 2022 – Jun 2024 · 1 yr 7 mos");
    expect(formatRange("2024-01", "2024-12")).toBe("Jan 2024 – Dec 2024 · 1 yr");
    expect(formatRange("2025-01", "2025-01")).toBe("Jan 2025 – Jan 2025 · 1 mo");
  });

  test("ongoing ranges run to now", () => {
    expect(formatRange("2025-01", null, new Date(2026, 8, 30))).toBe("Jan 2025 – Present · 1 yr 9 mos");
  });
});
