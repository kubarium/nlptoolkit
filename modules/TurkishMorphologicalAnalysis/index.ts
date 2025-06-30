import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishMorphologicalAnalysis",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishMorphologicalAnalysis",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
