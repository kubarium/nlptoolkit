import { SentiNet } from "nlptoolkit-sentinet/dist/SentiNet.js";
import { SentiLiteralNet } from "nlptoolkit-sentinet/dist/SentiLiteralNet.js";

const sentiNet = new SentiNet();
const sentiLiteralNet = new SentiLiteralNet();

export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (url.pathname.endsWith("/SentiLiteral")) {
    const sentiLiteral = sentiLiteralNet.getSentiLiteral(url.searchParams.get("word"));
    return { payload: sentiLiteral || null };
  } else if (url.pathname.endsWith("/SentiSynSet")) {
    const sentiSynSet = sentiNet.getSentiSynSet(url.searchParams.get("synSetId"));
    return { payload: sentiSynSet || null };
  } else {
    return { payload: null };
  }
});
