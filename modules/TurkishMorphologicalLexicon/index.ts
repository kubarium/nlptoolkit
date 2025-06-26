import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishMorphologicalLexicon",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishMorphologicalLexicon",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
