<script setup lang='ts'>
import type { PropBankEntry } from '~/modules/TurkishPropBank/runtime/api-route';

const searchTerms = reactive({
  verb: "", synSetId: ""
})
const search = ref()
const searchResults = ref<PropBankEntry[]>([])
const searchedSynSetId = ref(false)

async function findVerb(verb: string) {
  search.value = verb
  searchedSynSetId.value = false

  const { data } = await useFetch(`/api/TurkishPropBank/VerbSearch?verb=${verb}`)
  searchResults.value = data.value.payload as PropBankEntry[]
}

async function findSynSetID(synSetId: string) {
  search.value = synSetId
  searchedSynSetId.value = true

  const { data } = await useFetch(`/api/TurkishPropBank/SynSetIdSearch?synSetId=${synSetId}`)
  searchResults.value = data.value.payload as PropBankEntry[]
}


</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish PropBank</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.verb" @submit.prevent="findVerb(searchTerms.verb)">Verb</SearchForm>
      <SearchForm v-model="searchTerms.synSetId" @submit.prevent="findSynSetID(searchTerms.synSetId)">SynSet Id
      </SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center overflow-auto">
        <template v-if="searchResults">
          <p class="my-2">Results for {{ search }}</p>
          <table>
            <thead>
              <tr>
                <th v-if="!searchedSynSetId" class="p-2 min-w-36">Id</th>
                <th v-if="!searchedSynSetId" class="p-2">Definition</th>
                <th class="p-2">Arg</th>
                <th class="p-2">Function</th>
                <th class="p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, index) in searchResults" :key="index" class="odd:bg-zinc-50 border-t border-zinc-200">
                <td v-if="!searchedSynSetId" class="p-2 align-top">
                  <a class="underline underline-offset-2 text-sky-600 cursor-pointer" @click="findSynSetID(result.id)">
                    {{ result.id }}
                  </a>
                </td>
                <td v-if="!searchedSynSetId" class="p-2 max-w-192 align-top">
                  {{ result.definition }}
                </td>
                <td class="p-2 align-top">
                  <UBadge color="secondary">{{ result.arg }}</UBadge>
                </td>
                <td class="p-2 align-top">
                  <UBadge color="neutral">{{ result.function }}</UBadge>
                </td>
                <td class="p-2 align-top">{{ result.description }}</td>
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