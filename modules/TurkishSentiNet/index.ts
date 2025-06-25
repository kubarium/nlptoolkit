import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "TurkishSentiNet",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/TurkishSentiNet/SentiLiteral",
      handler: resolver.resolve("./runtime/api-route"),
    });

    addServerHandler({
      route: "/api/TurkishSentiNet/SentiSynSet",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
