<script setup lang='ts'>
const searchTerms = reactive({
  sentence: ""
})
const search = ref()
const searchResult = ref("")

async function spellCheck(sentence: string) {
  search.value = sentence

  const { data } = await useFetch(`/api/TurkishAsciifier?sentence=${sentence}`)
  searchResult.value = data.value.payload
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish Asciifier</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.sentence" @submit.prevent="spellCheck(searchTerms.sentence)"
        button-label="Asciify">Sentence</SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">
        <div class="text-lg my-2">Asciified version of</div>
        <div class="">
          {{ search }}
        </div>
        <div class="my-2">is</div>
        <div class="">
          {{ searchResult }}
        </div>
      </div>
    </template>
  </div>
</template>