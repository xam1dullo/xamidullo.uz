import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://xamidullo.uz",
  output: "static",
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      wrap: false,
    },
  },
});
