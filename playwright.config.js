// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/", // Path to your test files
  timeout: 20 * 1000, // Test timeout in milliseconds
  use: {
    headless: false, // Run tests in headless mode
    baseURL: "http://localhost:5173", // Replace with your app's base URL
    viewport: { width: 1300, height: 720 }, // Default viewport
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
  ],
  webServer: {
    command: "npm run build && npm run preview", // Command to start your server
    port: 5173, // Port your app runs on
    reuseExistingServer: true,
    timeout: 60000, // Wait time for server start in milliseconds
  },
});
