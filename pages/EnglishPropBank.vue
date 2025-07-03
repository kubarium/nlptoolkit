<script setup lang='ts'>
import type { PredicateEntry } from '~/modules/EnglishPropBank/runtime/api-route';

const searchTerms = reactive({
  predicate: "", rolesetId: ""
})
const search = ref()
const searchResults = ref([])
const searchedRolesetId = ref(false)

async function findVerb(predicate: string) {
  search.value = predicate
  searchTerms.predicate = predicate
  searchedRolesetId.value = false

  const { data } = await useFetch(`/api/EnglishPropBank/PredicateSearch?predicate=${predicate}`)
  searchResults.value = data.value.payload as PredicateEntry[]
}

async function findRolesetId(rolesetId: string) {
  search.value = rolesetId
  searchTerms.rolesetId = rolesetId
  searchedRolesetId.value = true

  const { data } = await useFetch(`/api/EnglishPropBank/RolesetIdSearch?rolesetId=${rolesetId}`)
  searchResults.value = data.value.payload as PredicateEntry[]
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">English PropBank</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.predicate" @submit.prevent="findVerb(searchTerms.predicate)">
        Predicate
      </SearchForm>
      <SearchForm v-model="searchTerms.rolesetId" @submit.prevent="findRolesetId(searchTerms.rolesetId)">
        Roleset Id
      </SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center overflow-auto">
        <template v-if="searchResults">
          <p class="my-2">Results for {{ search }}</p>
          <p v-if="searchedRolesetId" class="my-2 font-bold">"{{ searchResults[0].name }}"</p>
          <table>
            <thead>
              <tr>
                <th v-if="!searchedRolesetId" class="p-2 min-w-36">Id</th>
                <th v-if="!searchedRolesetId" class="p-2">Name</th>
                <th class="p-2">Description</th>
                <th class="p-2">F</th>
                <th class="p-2">N</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, index) in searchResults" :key="index" class="odd:bg-zinc-50 border-t border-zinc-200">
                <td v-if="!searchedRolesetId" class="p-2 align-top">
                  <a class="underline underline-offset-2 text-sky-600 cursor-pointer" @click="findRolesetId(result.id)">
                    {{ result.id }}
                  </a>
                </td>
                <td v-if="!searchedRolesetId" class="p-2 max-w-192 align-top">
                  {{ result.name }}
                </td>
                <td class="p-2 align-top">{{ result.description }}</td>
                <td class="p-2 align-top">
                  <UBadge color="secondary">{{ result.f }}</UBadge>
                </td>
                <td class="p-2 align-top">
                  <UBadge color="neutral">{{ result.n }}</UBadge>
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