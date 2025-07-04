import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishWordSenseDisambiguation",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishWordSenseDisambiguation",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
