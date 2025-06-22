<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const menu_labels = {
  "Turkish": {
    "Resources": ['FrameNet', 'PropBank', 'WordNet', 'SentiNet', 'Dictionary', 'Morphological Lexicon'],
    "Processing": ['Spell Checker', 'Morphological Analysis', 'Morphological Disambiguation', 'Asciifier', 'Deasciifier', 'Word Sense Disambiguation', 'Sentiment Analysis', 'Named Entity Recognition']
  },
  "English": {
    "Resources": ['PropBank', 'WordNet'],
    "Processing": ['Pos Tagger']
  }
}
const create_menu_items = (language: string, section: string) => {
  return menu_labels[language][section].map((item) => {
    return { label: item, to: `/${language}${item}`, value: `${language} ${item}` }
  })
}
const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Turkish',
      icon: 'flagpack:tr', defaultOpen: true,
      children: [
        {
          label: 'Resources',
          icon: 'la:dropbox', defaultOpen: true,
          children: create_menu_items('Turkish', 'Resources')
        }, {
          label: 'Processing',
          icon: 'material-symbols:stairs-2',
          children: create_menu_items('Turkish', 'Processing')
        }
      ]
    },
  ],
  [{
    label: 'English',
    icon: 'flagpack:gb-ukm',
    children: [
      {
        label: 'Resources',
        icon: 'la:dropbox',
        children: create_menu_items('English', 'Resources')
      }, {
        label: 'Processing',
        icon: 'material-symbols:stairs-2',
        children: create_menu_items('English', 'Processing')
      }
    ]
  }],
  // [{ icon: 'carbon:side-panel-close-filled', type: 'trigger', onSelect: () => collapsed.value = !collapsed.value }]
])

</script>


<template>
  <header class="flex flex-col">
    <router-link class="text-lg text-center text-sky-600 pb-4" to="/">NLP Toolkit</router-link>

    <UNavigationMenu orientation="vertical" :items="items" class="flex-grow overflow-auto" highlight
      color="secondary" />

    <a href="https://github.com/StarlangSoftware" target="_blank"
      class="flex self-center items-center justify-self-end py-2 gap-4">
      <img src="https://avatars.githubusercontent.com/u/61943048?s=48&v=4" alt="Starlang Software Logo">
      Starlang Software
    </a>
  </header>
</template>
