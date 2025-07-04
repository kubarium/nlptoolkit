import { Sentence } from "nlptoolkit-corpus/dist/Sentence.js";
import type { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import type { Literal } from "nlptoolkit-wordnet/dist/Literal.js";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet.js";

const turkishWordNet = new WordNet();

export default defineEventHandler((event) => {
  const sentence = new Sentence(getRequestURL(event).searchParams.get("sentence").toLowerCase());
  const payload = {};

  for (const word of sentence.getWords() as Word[]) {
    const literals = turkishWordNet.getLiteralsWithName(word.getName()) as Literal[];
    payload[word.getName()] = [];

    literals.forEach((literal: Literal) => payload[word.getName()].push(literal.getSynSetId()));
  }

  return {
    payload: payload || null,
  };
});
