import { defineConfig, devices } from "@playwright/test";
import { APP_PORT as PORT, MOCK_RESEND_PORT, MOCK_RESEND_URL } from "./tests/ports";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  // Never reuse an existing server: one started outside the suite could hold the real
  // RESEND_API_KEY from .env.local and send real email.
  webServer: process.env.BASE_URL
    ? undefined
    : [
        {
          command: "node tests/mock-resend.mjs",
          port: MOCK_RESEND_PORT,
          env: { MOCK_RESEND_PORT: String(MOCK_RESEND_PORT) },
          reuseExistingServer: false,
        },
        {
          command: `npm run build && npm run start -- -p ${PORT}`,
          port: PORT,
          // process.env takes precedence over .env.local, so these replace the real key.
          env: {
            RESEND_API_KEY: "re_test_key",
            RESEND_BASE_URL: MOCK_RESEND_URL,
          },
          reuseExistingServer: false,
          timeout: 180_000,
        },
      ],
});
