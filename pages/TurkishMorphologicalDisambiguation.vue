<script setup lang='ts'>
const searchTerms = reactive({
  sentence: ""
})
const search = ref()
const searchResult = ref([])

async function analyze(sentence: string) {
  search.value = sentence

  const { data } = await useFetch(`/api/TurkishMorphologicalDisambiguation?sentence=${sentence}`)
  searchResult.value = data.value.payload
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish Morphological Disambiguation</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.sentence" @submit.prevent="analyze(searchTerms.sentence)"
        button-label="Disambiguate">
        Sentence</SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">
        <div class="text-lg my-2">Morphological disambiguation of</div>
        <div class="">{{ search }}</div>
        <div class="my-2">is</div>
        <dl class="divide-y divide-gray-200">
          <template v-for="(word, index1) in search.split(' ')" :key="word">
            <div class="px-4 py-3 grid grid-cols-4 gap-4">
              <dt class=" font-medium text-gray-900 flex justify-end py-2">{{ word }}</dt>
              <dd class="  text-gray-700 col-span-3">
                <UBadge v-if="searchResult[index1] == ''" color="error" class="my-2">UNK</UBadge>

                <div v-else class="my-2">
                  <template v-for="(chunk, index) in searchResult[index1].split('+')" :key="index">
                    <span v-if="index != 0">+</span>
                    <UBadge v-if="index == 0" color="neutral">
                      {{ chunk }}
                    </UBadge>
                    <UBadge v-else color="secondary">
                      {{ chunk }}
                    </UBadge>
                  </template>
                </div>

              </dd>
            </div>
          </template>
        </dl>
      </div>
    </template>
  </div>
</template>