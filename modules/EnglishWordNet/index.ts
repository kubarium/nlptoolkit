import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "EnglishWordNet",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/EnglishWordNet/WordSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });
    addServerHandler({
      route: "/api/EnglishWordNet/SynonymSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });
    addServerHandler({
      route: "/api/EnglishWordNet/SynSetIdSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
