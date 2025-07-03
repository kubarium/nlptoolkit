import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "EnglishPropBank",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/EnglishPropBank/PredicateSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });

    addServerHandler({
      route: "/api/EnglishPropBank/RolesetIdSearch",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
