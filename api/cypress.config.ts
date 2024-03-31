import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "http://localhost:5000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    CY_ENV_API_URL: "http://localhost:3000",
    CY_ENV_DB_FILENAME: "app_db.db",
    // Add other environment variables here
  },
});
