import type { APIRequestContext, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { MOCK_RESEND_URL } from "./ports";

// These post to /api/contact, which sends mail. Only run them against the local build,
// where Resend is replaced by tests/mock-resend.mjs.
test.skip(!!process.env.BASE_URL, "never send contact mail from a remote target");

const valid = {
  name: "Test Person",
  email: "test@example.com",
  subject: "Hello",
  message: "This is a test message that is long enough.",
};

const unique = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;
/** Each test gets its own client address so the per-IP rate limit can't leak between tests. */
const clientIp = () => `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

const sentEmails = async (request: APIRequestContext) =>
  (await (await request.get(`${MOCK_RESEND_URL}/__emails`)).json()) as Array<Record<string, unknown>>;

const openContact = async (page: Page) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": clientIp() });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Taskbar" }).getByRole("button", { name: "Contact", exact: true }).click();
  return page.getByRole("region", { name: "Contact", exact: true });
};

test("form validates before sending", async ({ page }) => {
  const contact = await openContact(page);
  await contact.getByRole("button", { name: /send/i }).click();
  await expect(contact.getByText("Name must be at least 2 characters.")).toBeVisible();
  await expect(contact.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(contact.getByText("Message must be at least 10 characters.")).toBeVisible();
});

test("form sends a plain-text email", async ({ page, request }) => {
  const subject = `UI ${unique()}`;
  const contact = await openContact(page);
  await contact.getByRole("textbox", { name: "Name" }).fill(valid.name);
  await contact.getByRole("textbox", { name: "Email" }).fill(valid.email);
  await contact.getByRole("textbox", { name: "Subject" }).fill(subject);
  await contact.getByRole("textbox", { name: "Message" }).fill("Hi <b>there</b>, <script>alert(1)</script>");
  await contact.getByRole("button", { name: /send/i }).click();
  await expect(contact.getByRole("status")).toHaveText("Message sent successfully!");

  const email = (await sentEmails(request)).find((e) => e.subject === `Portfolio Contact: ${subject}`);
  expect(email).toBeDefined();
  expect(email!.html).toBeUndefined();
  expect(email!.text).toContain("Hi <b>there</b>, <script>alert(1)</script>");
  expect([email!.reply_to].flat()).toContain(valid.email);
});

test("api rejects invalid submissions", async ({ request }) => {
  const res = await request.post("/api/contact", {
    headers: { "x-forwarded-for": clientIp() },
    data: { ...valid, email: "not-an-email", message: "short" },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(Object.keys(body.fields)).toEqual(expect.arrayContaining(["email", "message"]));
});

test("api rejects a malformed body", async ({ request }) => {
  const res = await request.post("/api/contact", {
    headers: { "x-forwarded-for": clientIp(), "content-type": "application/json" },
    data: "{not json",
  });
  expect(res.status()).toBe(400);
});

test("honeypot submissions look successful but send nothing", async ({ request }) => {
  const subject = `Bot ${unique()}`;
  const res = await request.post("/api/contact", {
    headers: { "x-forwarded-for": clientIp() },
    data: { ...valid, subject, website: "https://spam.example" },
  });
  expect(res.status()).toBe(200);
  expect((await sentEmails(request)).some((e) => String(e.subject).includes(subject))).toBe(false);
});

test("api rate-limits a single client", async ({ request }) => {
  const ip = clientIp();
  const statuses: number[] = [];
  for (let i = 0; i < 6; i++) {
    const res = await request.post("/api/contact", { headers: { "x-forwarded-for": ip }, data: {} });
    statuses.push(res.status());
  }
  expect(statuses).toEqual([400, 400, 400, 400, 400, 429]);
});
