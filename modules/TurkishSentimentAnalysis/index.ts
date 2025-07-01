import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishSentimentAnalysis",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishSentimentAnalysis",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
