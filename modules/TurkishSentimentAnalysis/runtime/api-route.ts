import { SentiLiteralNet } from "nlptoolkit-sentinet/dist/SentiLiteralNet.js";
import type { SentiLiteral } from "nlptoolkit-sentinet/dist/SentiLiteral";
import { PolarityType } from "nlptoolkit-sentinet/dist/PolarityType";

const sentiLiteralNet = new SentiLiteralNet();

export default defineEventHandler((event) => {
  const sentence = getRequestURL(event).searchParams.get("sentence");
  const analysis = sentence
    .split(" ")
    .map((word) => sentiLiteralNet.getSentiLiteral(word))
    .map((literal: SentiLiteral) => (literal ? literal.getPolarity() : PolarityType.NEUTRAL));

  return { payload: analysis };
});
