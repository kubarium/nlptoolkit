<script setup lang='ts'>
import type { TabsItem } from '@nuxt/ui'

const searchTerms = reactive({
  frame: "", verb: "", id: ""
})
const search = ref("")
const searchResults = ref([])

function findFrame(frame) {
  // search.value = frame
  // searchTerms.frame = ""
  // const entry = turkishFrameNet.find(entry => entry.frame == frame)
  // if (entry) {
  //   searchResults.value = [{
  //     frame,
  //     lexicalUnits: entry?.lexicalUnits,
  //     frameElements: entry?.frameElements
  //   }]
  // }
  // else searchResults.value = []
  // scrollToTop()
}
function findVerb(word) {
  // search.value = word
  // searchTerms.verb = ""
  // searchResults.value = getFramesForSynSets(getSynsetsWithWord(word, turkishWordNet), turkishFrameNet)
  // scrollToTop()
}
function findSynSetID(id) {
  // search.value = id
  // searchTerms.id = ""
  // searchResults.value = getFramesForSynSet(id, turkishFrameNet)
  // scrollToTop()
}
const data = ref([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }, {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }, {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])
const items = ref<TabsItem[]>([
  {
    label: 'Account'
  },
  {
    label: 'Password'
  }
])
</script>
<template>
  <div class="flex flex-col gap-6 p-6 h-screen overflow-clip1">
    <h1 class="text-center text-xl text-sky-600">Turkish FrameNet</h1>
    <header class="flex flex-row  gap-2 justify-center">
      <SearchForm v-model="searchTerms.frame" @submit.prevent="findFrame(searchTerms.frame)">Frame Name</SearchForm>
      <SearchForm v-model="searchTerms.verb" @submit.prevent="findVerb(searchTerms.verb)">Verb</SearchForm>
      <SearchForm v-model="searchTerms.id" @submit.prevent="findSynSetID(searchTerms.id)">Verb SynSet Id</SearchForm>
    </header>
    <div class="flex flex-grow gap-2 items-start border border-amber-500 overflow-auto">
      <div class="flex flex-col">
        Frames
        <UTabs :items="items" orientation="vertical" color="secondary" :content="false" variant="link" class="" />
      </div>
      <div class="flex flex-col border gap-2">

        Frame Elements
        <div>
          <UBadge>Badge</UBadge>
        </div>
        Lexical Units
        <UTable :data="data" class="flex-grow h-fit"  sticky />
      </div>
    </div>
  </div>
</template>