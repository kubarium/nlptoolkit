<script setup lang='ts'>
import * as GaugeChart from 'gauge-chart'

type SearchResultType = {
  name: string,
  positiveScore: number,
  negativeScore: number
}
const gaugeArea = useTemplateRef('gaugeArea')
const gaugeOptions = {
  hasNeedle: true,
  needleColor: 'rgb(43,127,245)',
  needleUpdateSpeed: 1000,
  arcColors: ['rgb(244, 51, 22)', 'lightgray', 'rgb(24, 221, 32)'],
  arcDelimiters: [50, 50],
  rangeLabel: ['-1', '1'],
  centralLabel: '',
}

const searchTerms = reactive({
  word: "", id: ""
})
const search = ref()
const searchResult = ref()

const sentimentScore = computed(() => searchResult.value?.positiveScore - searchResult.value?.negativeScore)

async function findWord(word: string) {
  search.value = word

  const { data } = await useFetch(`/api/TurkishSentiNet/SentiLiteral?word=${word}`)
  searchResult.value = data.value.payload as SearchResultType
  updateGauge()
}
async function findSynSetID(id: string) {
  search.value = id

  const { data } = await useFetch(`/api/TurkishSentiNet/SentiSynSet?synSetId=${id}`)
  searchResult.value = data.value.payload as SearchResultType
  updateGauge()
}
function updateGauge() {
  gaugeArea.value.innerHTML = ''
  GaugeChart.gaugeChart(gaugeArea.value, 300, gaugeOptions).updateNeedle(sentimentScore.value / 2 * 100 + 50)
}
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen">
    <h1 class="text-center text-xl text-sky-600">Turkish SentiNet</h1>
    <header class="flex flex-row gap-2 justify-center">
      <SearchForm v-model="searchTerms.word" @submit.prevent="findWord(searchTerms.word)">Word</SearchForm>
      <SearchForm v-model="searchTerms.id" @submit.prevent="findSynSetID(searchTerms.id)">SynSet Id</SearchForm>
    </header>
    <template v-if="search">
      <div class="flex flex-col items-center">
        <template v-if="searchResult">
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
        </template>
        <div ref="gaugeArea" />
      </div>
    </template>
  </div>
</template>