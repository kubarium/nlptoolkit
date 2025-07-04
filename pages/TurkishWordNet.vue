<script setup lang='ts'>
import type { TabsItem } from '@nuxt/ui';

const years = ["1901", "1944", "1955", "1959", "1966", "1969", "1974", "1983", "1988", "1998", "2020"]
const tabs: TabsItem[] = years.reverse().map((year) => ({ label: year, value: year }))

const searchTerms = reactive({
  word: "", synonym: "", synSetId: ""
})
const search = ref("")
const searchResults = ref({})
const change_year = (event) => {
  tab.value = event;
  searchResultsContainer.value.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}
const tab = ref("2020")
const searchResultsContainer = useTemplateRef("searchResultsContainer")

async function findWord(word) {
  search.value = word
  searchTerms.word = word

  const { data } = await useFetch(`/api/TurkishWordNet/WordSearch?word=${word}`)
  searchResults.value = data.value.payload

}
async function findSynonym(synonym) {
  search.value = synonym
  searchTerms.synonym = synonym

  const { data } = await useFetch(`/api/TurkishWordNet/SynonymSearch?synonym=${synonym}`)
  searchResults.value = data.value.payload
}
async function findSynSetID(synSetId) {
  search.value = synSetId
  searchTerms.synSetId = synSetId

  const { data } = await useFetch(`/api/TurkishWordNet/SynSetIdSearch?synSetId=${synSetId}`);
  searchResults.value = data.value.payload
}

</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish WordNet</h1>
    <header class="flex flex-row  gap-2 justify-center">
      <SearchForm v-model="searchTerms.word" @submit.prevent="findWord(searchTerms.word)">
        Word
      </SearchForm>
      <SearchForm v-model="searchTerms.synonym" @submit.prevent="findSynonym(searchTerms.synonym)">
        Synonym
      </SearchForm>
      <SearchForm v-model="searchTerms.synSetId" @submit.prevent="findSynSetID(searchTerms.synSetId)">
        SynSet Id
      </SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center overflow-auto">
        <template v-if="searchResults">
          <p class="my-2">Results for {{ search }}</p>
          <UTabs :model-value="tab" :content="false" :items="tabs" class="w-full my-2" color="secondary"
            @update:model-value="change_year" />
          <div class="overflow-auto" ref="searchResultsContainer">
            <table v-if="searchResults[tab]?.length">
              <thead>
                <tr>
                  <th class="p-2 min-w-36">Id</th>
                  <th class="p-2">Synonyms</th>
                  <th class="p-2" title="Part of Speech">POS</th>
                  <th class="p-2">Definition</th>
                  <th class="p-2">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result) in searchResults[tab]" :key="result['id']"
                  class="odd:bg-zinc-50 border-t border-zinc-200">
                  <td class="p-2 align-top">
                    <a class="underline underline-offset-2 text-sky-600 cursor-pointer"
                      @click="findSynSetID(result['id'])">
                      {{ result["id"] }}

                    </a>
                  </td>
                  <td class="p-2 max-w-192 align-top">
                    <template v-for="(synonym, index) in result['synonym']['literals'].map(s => s.name)" :key="index">
                      <span v-if="index > 0">; </span>
                      <a class="underline underline-offset-2 text-sky-600 cursor-pointer" @click="findSynonym(synonym)">
                        {{ synonym }}
                      </a>
                    </template>
                  </td>
                  <td class="p-2 align-top">{{ result["pos"] }}</td>
                  <td class="p-2 align-top">{{ result["definition"].toString() }}</td>
                  <td class="p-2 align-top">{{ result["example"] }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else>No results for {{ tab }}</p>
          </div>
        </template>
        <template v-else>
          No results for {{ search }}
        </template>
      </div>
    </template>
  </div>
</template>