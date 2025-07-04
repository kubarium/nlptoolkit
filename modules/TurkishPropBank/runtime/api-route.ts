import { WordNet } from "nlptoolkit-wordnet/dist/WordNet.js";
import { FramesetList } from "nlptoolkit-propbank/dist/FramesetList.js";
import type { SynSet } from "nlptoolkit-wordnet/dist/SynSet.js";


export type PropBankEntry = {
  id?: string;
  definition?: string;
  arg: string;
  function: string;
  description: string;
};
const turkishWordNet = new WordNet();
const turkishPropBank = new FramesetList();

export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  if (url.pathname.endsWith("/VerbSearch")) {
    const synsets = turkishWordNet.getSynSetsWithLiteral(url.searchParams.get("verb"));
    const payload: PropBankEntry[] = [];

    for (const synset of synsets) {
      const frameset = turkishPropBank.getFrameSet(synset.getId());

      if (!frameset) continue;
      for (const arg of frameset.getFramesetArguments()) {
        payload.push({
          id: synset.getId(),
          definition: synset.getDefinition(),
          arg: arg.getArgumentType(),
          function: arg.getFunction(),
          description: arg.getDefinition(),
        });
      }
    }

    return { payload: payload.length ? payload : null };
  } else if (url.pathname.endsWith("/SynSetIdSearch")) {
    const synset: SynSet = turkishWordNet.getSynSetWithId(url.searchParams.get("synSetId"));
    const payload: PropBankEntry[] = [];

    if (synset) {
      const frameset = turkishPropBank.getFrameSet(synset.getId());

      if (frameset) {
        for (const arg of frameset.getFramesetArguments()) {
          payload.push({
            arg: arg.getArgumentType(),
            function: arg.getFunction(),
            description: arg.getDefinition(),
          });
        }
      }
    }

    return { payload: payload.length ? payload : null };
  } else {
    return { payload: null };
  }
});
