// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
    strict: false,
    includeWorkspace: true,
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "@nuxt/ui"],
});
