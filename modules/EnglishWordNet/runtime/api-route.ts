import { WordNet } from "nlptoolkit-wordnet/dist/WordNet.js";

type UnknownEnglishWordNet = {
  [key: string]: WordNet;
};

const englishWordNets: UnknownEnglishWordNet = {};
const englishWordNet = new WordNet("english_wordnet_version_31.xml", "en");
//I kept the object structure similar to TurkishWordNet route handler
englishWordNets["2020"] = englishWordNet;

const searchInWordNet = (word) => {
  const payload = {};

  for (const year of Object.keys(englishWordNets)) {
    //We will go with the next until getPos returns literal values instead of numerical ones
    const synSets = englishWordNets[year].getSynSetsWithLiteral(word);
    payload[year] = synSets || null;
    //Below is when I tried to convert to literal values but no enum has been identified
    /* const synSets = englishWordNets[year].getSynSetsWithLiteral(word);
      payload[year] = synSets.map((synSet) =>
        Object.assign(synSet, {
          pos: synSet.getPos()
        })
      ); */
  }

  return payload;
};

export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  if (url.pathname.endsWith("/WordSearch")) {
    const payload = searchInWordNet(url.searchParams.get("word"));

    return { payload: payload || null };
  } else if (url.pathname.endsWith("/SynonymSearch")) {
    const payload = searchInWordNet(url.searchParams.get("synonym"));

    return { payload: payload || null };
  } else if (url.pathname.endsWith("/SynSetIdSearch")) {
    const payload = {};

    for (const year of Object.keys(englishWordNets)) {
      const synSet = englishWordNets[year].getSynSetWithId(url.searchParams.get("synSetId"));
      payload[year] = synSet ? [synSet] : null;
    }

    return { payload: payload || null };
  } else {
    return { payload: null };
  }
});
