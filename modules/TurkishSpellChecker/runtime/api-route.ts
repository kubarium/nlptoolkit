import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer.js";
import { SimpleSpellChecker } from "nlptoolkit-spellchecker/dist/SimpleSpellChecker.js";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence.js";

const fsm = new FsmMorphologicalAnalyzer();
const simpleSpellChecker = new SimpleSpellChecker(fsm);

export default defineEventHandler((event) => {
  const sentence = new Sentence(getRequestURL(event).searchParams.get("sentence"));

  const spellCheckedSentence = simpleSpellChecker.spellCheck(sentence);
  const corrections = {};
  
  spellCheckedSentence.getWords().forEach((word, index) => {
    const originalWord: string = sentence.getWords()[index].toString();

    if (originalWord !== word.getName()) {
      corrections[originalWord] = word.getName();
    }
  });

  return { payload: corrections };
});
