import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer.js";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence.js";
import { LongestRootFirstDisambiguation } from "nlptoolkit-morphologicaldisambiguation/dist/LongestRootFirstDisambiguation.js";
import type { FsmParseList } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmParseList.js";

const fsm = new FsmMorphologicalAnalyzer();
const disambiguator = new LongestRootFirstDisambiguation();

export default defineEventHandler((event) => {
  const sentence = new Sentence(getRequestURL(event).searchParams.get("sentence"));
  const analyzedSentence: Array<FsmParseList> = fsm.robustMorphologicalAnalysisFromSentence(sentence);
  const disambiguatedSentence = disambiguator.disambiguate(analyzedSentence);

  const analysis = disambiguatedSentence.map(word=>word.getFsmParseTransitionList());

  return { payload: analysis };
});