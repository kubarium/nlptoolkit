<script setup lang='ts'>
const searchTerms = reactive({
  word: ""
})
const search = ref()
const searchResult = ref()

// Dictionary corpus is all lowercase (even proper nouns like "google"), so force the
// input textbox to lowercase as the user types. Turkish locale keeps "İ" → "i" and
// "I" → "ı" correct (JS default locale mishandles the dotted-I rules).
watch(() => searchTerms.word, (val) => {
  const lowered = val.toLocaleLowerCase("tr")
  if (lowered !== val) searchTerms.word = lowered
})

async function findWord(word: string) {
  search.value = word
  // $fetch (not useFetch): imperative, no cache, no SSR reactivity. useFetch inside
  // an event handler was returning stale/partial responses on rapid re-submits.
  const { payload } = await $fetch<{ payload: string }>(
    `/api/TurkishDictionary?word=${encodeURIComponent(word)}`
  )
  searchResult.value = payload
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish Dictionary</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.word" @submit.prevent="findWord(searchTerms.word)">Word</SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">{{ searchResult }}</div>
    </template>
  </div>
</template>