import { NamedEntitySentence } from "nlptoolkit-namedentityrecognition/dist/NamedEntitySentence.js";
import type { NamedEntityWord } from "nlptoolkit-namedentityrecognition/dist/NamedEntityWord.js";

export default defineEventHandler((event) => {
  const sentence = getRequestURL(event).searchParams.get("sentence");
  const analysis = new NamedEntitySentence(sentence)
    .getWords()
    .map((word: NamedEntityWord) => word.getNamedEntityType());

  return { payload: analysis };
});
