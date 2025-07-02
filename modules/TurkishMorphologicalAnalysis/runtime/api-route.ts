import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer.js";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence.js";
import type { FsmParseList } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmParseList.js";

const fsm = new FsmMorphologicalAnalyzer();

export default defineEventHandler((event) => {
  const sentence = new Sentence(getRequestURL(event).searchParams.get("sentence"));
  const analyzedSentence:Array<FsmParseList> = fsm.morphologicalAnalysisFromSentence(sentence);

  const analysis = [];

  for (let i = 0; i < sentence.wordCount(); i++) {
    const fsmParseList = analyzedSentence[i];
    const transition_list = []

    for (let j = 0; j < fsmParseList.size(); j++) {
      transition_list.push(fsmParseList.getFsmParse(j).getFsmParseTransitionList());
    }
    analysis.push(transition_list);
  }

  return { payload: analysis };
});
