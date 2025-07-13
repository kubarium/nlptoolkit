import { DummyPosTagger } from "nlptoolkit-postagger/dist/DummyPosTagger.js";
import { HmmPosTagger } from "nlptoolkit-postagger/dist/HmmPosTagger.js";
import { NaivePosTagger } from "nlptoolkit-postagger/dist/NaivePosTagger.js";
import { PosTaggedCorpus } from "nlptoolkit-postagger/dist/PosTaggedCorpus.js";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence.js";
import type { PosTaggedWord } from "nlptoolkit-postagger/dist/PosTaggedWord.js";
import type { PosTagger } from "nlptoolkit-postagger/dist/PosTagger";

//To expose a new tagger, remember to add it to utils/taggers.ts so front-end can use it
const taggers = {
  "Dummy": new DummyPosTagger(),
  "Hmm": new HmmPosTagger(),
  "Naive": new NaivePosTagger(),
};
Object.values(taggers).forEach((tagger: PosTagger) => {
  tagger.train(new PosTaggedCorpus("brown.txt"));
});

export default defineEventHandler((event) => {
  const tagger = getRequestURL(event).searchParams.get("tagger");
  const sentence = new Sentence(getRequestURL(event).searchParams.get("sentence").toLowerCase());

  const annotatedSentence = taggers[tagger].posTag(sentence);
  const analysis = annotatedSentence.getWords().map((word: PosTaggedWord) => word.getTag() || "UNK");

  return { payload: analysis };
});
