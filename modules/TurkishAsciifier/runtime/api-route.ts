import { Sentence } from "nlptoolkit-corpus/dist/Sentence.js";
import { SimpleAsciifier } from "nlptoolkit-deasciifier/dist/SimpleAsciifier.js";

const asciifier = new SimpleAsciifier();

export default defineEventHandler((event) => {
  const sentence = new Sentence(getRequestURL(event).searchParams.get("sentence"));

  return {
    payload: asciifier
      .asciify(sentence)
      .getWords()
      .map((word) => word.getName())
      .join(" "),
  };
});
