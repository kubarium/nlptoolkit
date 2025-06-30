import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishMorphologicalDisambiguation",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishMorphologicalDisambiguation",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
