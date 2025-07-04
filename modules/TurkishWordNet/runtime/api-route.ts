import { WordNet } from "nlptoolkit-wordnet/dist/WordNet.js";

type UnknownTurkishWordNet = {
  [key: string]: WordNet;
};

const turkishWordNets: UnknownTurkishWordNet = {};
const years = ["1901", "1944", "1955", "1959", "1966", "1969", "1974", "1983", "1988", "1998"];
//this default case is actually 2020
export const turkishWordNet = new WordNet("turkish_wordnet.xml", "tr");

years.forEach((year) => (turkishWordNets[year] = new WordNet(`turkish${year}_wordnet.xml`, "tr")));
turkishWordNets["2020"] = turkishWordNet;

const searchInWordNet = (word) => {
  const payload = {};

  for (const year of Object.keys(turkishWordNets)) {
    //We will go with the next until getPos returns literal values instead of numerical ones
    const synSets = turkishWordNets[year].getSynSetsWithLiteral(word);
    payload[year] = synSets || null;
    //Below is when I tried to convert to literal values but no enum has been identified
    /* const synSets = turkishWordNets[year].getSynSetsWithLiteral(word);
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

    for (const year of Object.keys(turkishWordNets)) {
      const synSet = turkishWordNets[year].getSynSetWithId(url.searchParams.get("synSetId"));
      payload[year] = synSet ? [synSet] : null;
    }

    return { payload: payload || null };
  } else {
    return { payload: null };
  }
});
