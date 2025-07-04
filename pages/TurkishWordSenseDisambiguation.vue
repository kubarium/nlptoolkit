<script setup lang='ts'>
const searchTerms = reactive({
  sentence: ""
})
const search = ref()
const searchResults = ref({})

async function analyze(sentence: string) {
  search.value = sentence

  const { data } = await useFetch(`/api/TurkishWordSenseDisambiguation?sentence=${sentence}`)
  searchResults.value = data.value.payload
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish Word Sense Disambiguation</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.sentence" button-label="Disambiguate"
        @submit.prevent="analyze(searchTerms.sentence)">
        Sentence
      </SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">
        <template v-if="searchResults">
          <table>
            <thead>
              <tr>
                <th class="p-2">Word</th>
                <th class="p-2">Disambiguation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(word, index) in search.split(' ')" :key="index"
                class="odd:bg-zinc-50 border-t border-zinc-200">
                <td class="p-2 align-top">
                  {{ word }}
                </td>
                <td class="p-2 max-w-192 align-top uppercase">
                  {{ searchResults[word].length ? searchResults[word].join(", ") : "None" }}
                </td>
              </tr>
            </tbody>
          </table>
        </template>
        <template v-else>
          No results for {{ search }}
        </template>
      </div>
    </template>
  </div>
</template>