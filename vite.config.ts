import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: "./.vite",
  test: {
    projects: [
      {
        // Database tests
        test: {
          include: ["image-library/src/main/__tests__/database.test.tsx"],
          environment: "node",
        },
      },
      {
        // Renderer tests
        test: {
          include: ["image-library/src/renderer/__tests__/**/*.test.{ts,tsx}"],
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
        },
      },
      {
        // Main process tests (excluding database tests)
        test: {
          include: ["image-library/src/main/__tests__/**/*.test.{ts,tsx}"],
          exclude: ["image-library/src/main/__tests__/database.test.tsx"], // Exclude database tests from main process tests
          environment: "node",
        },
      },
    ],
  },
});
