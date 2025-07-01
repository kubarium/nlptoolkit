import { NaivePosTagger } from "nlptoolkit-postagger/dist/NaivePosTagger.js";
import { PosTaggedCorpus } from "nlptoolkit-postagger/dist/PosTaggedCorpus.js";
import type { PosTaggedWord } from "nlptoolkit-postagger/dist/PosTaggedWord.js";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence.js";

const posTagger = new NaivePosTagger();
const posTaggedCorpus = new PosTaggedCorpus("brown.txt");
posTagger.train(posTaggedCorpus);

export default defineEventHandler((event) => {
  const sentence = new Sentence(getRequestURL(event).searchParams.get("sentence").toLowerCase());

  const annotatedSentence = posTagger.posTag(sentence);
  const analysis = annotatedSentence.getWords().map((word: PosTaggedWord) => word.getTag() || "UNK");

  return { payload: analysis };
});
