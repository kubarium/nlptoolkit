<script setup lang='ts'>
const searchTerms = reactive({
  word: ""
})
const search = ref()
const searchResult = ref()

async function findWord(word: string) {
  search.value = word

  const { data } = await useFetch(`/api/TurkishMorphologicalLexicon?word=${word}`)
  searchResult.value = data.value.payload
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish Morphological Lexicon</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.word" @submit.prevent="findWord(searchTerms.word)">Word</SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">{{ searchResult }}</div>
    </template>
  </div>
</template>