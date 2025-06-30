import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer.js";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence.js";
import { SimpleDeasciifier } from "nlptoolkit-deasciifier/dist/SimpleDeasciifier.js";

const fsm = new FsmMorphologicalAnalyzer();
const deasciifier = new SimpleDeasciifier(fsm);

export default defineEventHandler((event) => {
  const sentence = new Sentence(getRequestURL(event).searchParams.get("sentence"));

  return {
    payload: deasciifier.deasciify(sentence).toWords(),
  };
});
