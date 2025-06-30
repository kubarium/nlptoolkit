import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishAsciifier",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishAsciifier",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
