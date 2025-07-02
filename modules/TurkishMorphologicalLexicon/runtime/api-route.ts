import { TxtDictionary } from "nlptoolkit-dictionary/dist/Dictionary/TxtDictionary.js";
import type { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word.js";

const turkishDictionary = new TxtDictionary();

export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const word = url.searchParams.get("word");

  const txtWord = turkishDictionary.getWord(word) as Word;

  return { payload: txtWord || null };
});
