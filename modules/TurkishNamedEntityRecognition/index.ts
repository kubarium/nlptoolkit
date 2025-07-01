import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishNamedEntityRecognition",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishNamedEntityRecognition",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
