<script setup lang='ts'>
const searchTerms = reactive({
  sentence: ""
})
const search = ref()
const searchResult = ref({})

async function spellCheck(sentence: string) {
  search.value = sentence

  const { data } = await useFetch(`/api/TurkishSpellChecker?sentence=${sentence}`)
  searchResult.value = data.value.payload
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish Spell Checker</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.sentence" @submit.prevent="spellCheck(searchTerms.sentence)"
        button-label="Spell Check">Sentence</SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">
        <div class="text-lg my-2">The correct spelling for</div>
        <div class="">
          <template v-for="(word) in search.split(' ')" :key="word">
            <span class="mx-0.5" :class="{ 'text-red-500': searchResult[word] }">
              {{ word }}
            </span>
          </template>
        </div>
        <div class="my-2">is</div>
        <div class="">
          <template v-for="(word) in search.split(' ')" :key="word">
            <span v-if="searchResult[word]" class="text-green-500 mx-0.5">
              {{ searchResult[word] }}
            </span>
            <span v-else class="mx-0.5">
              {{ word }}
            </span>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>