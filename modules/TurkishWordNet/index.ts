import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishWordNet",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishWordNet/WordSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });
    addServerHandler({
      route: "/api/TurkishWordNet/SynonymSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });
    addServerHandler({
      route: "/api/TurkishWordNet/SynSetIdSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
