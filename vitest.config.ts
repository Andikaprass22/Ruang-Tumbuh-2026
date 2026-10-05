import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    // The host shell ships NODE_ENV=production, which makes React resolve its
    // production build (no `React.act`). Pin the test env so React loads its
    // development build, as Vitest expects.
    env: { NODE_ENV: "test" },
  },
});
