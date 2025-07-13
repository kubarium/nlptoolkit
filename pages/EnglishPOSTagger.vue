<script setup lang='ts'>
import { taggers } from "~/utils/taggers"
const tagger = ref("Naive")

const searchTerms = reactive({
  sentence: ""
})
const search = ref()
const searchResult = ref([])

async function analyze(sentence: string) {
  search.value = sentence

  const { data } = await useFetch(`/api/EnglishPOSTagger?sentence=${sentence}&tagger=${tagger.value}`)
  searchResult.value = data.value.payload
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">English POS Tagger</h1>
    <header class="flex flex-row gap-2 justify-center">
      <OptionSelector v-model="tagger" :items="taggers">POS Tagger</OptionSelector>
      <SearchForm v-model="searchTerms.sentence" button-label="Analyze" @submit.prevent="analyze(searchTerms.sentence)">
        Sentence
      </SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">
        <table>
          <thead>
            <tr>
              <th class="p-2">Word</th>
              <th class="p-2">Tag(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(word, index) in search.split(' ')" :key="index" class="odd:bg-zinc-50 border-t border-zinc-200">
              <td class="p-2 align-top">
                {{ word }}
              </td>
              <td class="p-2 max-w-192 align-top uppercase">
                {{ searchResult[index] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>