<script setup lang='ts'>
const searchTerms = reactive({
  word: ""
})
const search = ref()
const searchResult = ref()

async function findWord(word: string) {
  search.value = word

  const { data } = await useFetch(`/api/TurkishDictionary?word=${word}`)
  searchResult.value = data.value.payload
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish Dictionary</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.word" @submit.prevent="findWord(searchTerms.word)">Word</SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">{{ searchResult }}
        <!-- <template v-if="searchResult">
          <p v-if="sentimentScore > 0">
            Sentiment for <span class="italic">{{ search }}</span> is
            <span class="text-green-500 font-bold">positive</span>
            with a score <span class="font-bold">{{ sentimentScore }}</span>.
          </p>
          <p v-else-if="sentimentScore < 0">
            Sentiment for <span class="italic">{{ search }}</span> is
            <span class="text-red-500 font-bold">negative</span>
            with a score <span class="font-bold">{{ sentimentScore }}</span>.
          </p>
          <p v-else>
            Sentiment for {{ search }} is <span class="text-zinc-500">neutral</span>.
          </p>
        </template>
<template v-else>
          No results for {{ search }}
        </template> -->
      </div>
    </template>
  </div>
</template>