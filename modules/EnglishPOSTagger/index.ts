import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "EnglishPOSTagger",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/EnglishPOSTagger",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
