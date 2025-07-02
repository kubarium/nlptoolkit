import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishPropBank",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishPropBank/VerbSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });

    addServerHandler({
      route: "/api/TurkishPropBank/SynSetIdSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
