// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import commonjs from "@rollup/plugin-commonjs";

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
    plugins: [commonjs({ dynamicRequireTargets: ["node_modules/nlptoolkit-corpus/**"] }), tailwindcss()],
  },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "@nuxt/ui"],
});
