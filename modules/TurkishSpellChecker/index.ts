import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishSpellChecker",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishSpellChecker",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
