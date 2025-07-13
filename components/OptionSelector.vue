<script setup lang='ts'>
const model = defineModel<string>()
const props = defineProps<{ items: string[] }>()
</script>
<template>
  <form class="">
    <fieldset class="border  border-zinc-200 p-2 rounded-sm ">
      <legend class="p-2">
        <slot />
      </legend>
      <USelect v-model="model" :items="props.items" class="w-full" />
    </fieldset>
  </form>
</template>