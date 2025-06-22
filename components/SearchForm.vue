<script setup lang='ts'>
const model = defineModel<string>()
const props = defineProps<{ buttonLabel?: string }>()
</script>
<template>
  <form class="">
    <fieldset class="border  border-zinc-200 p-2 rounded-sm ">
      <legend class="p-2">
        <slot />
      </legend>
      <UButtonGroup>
        <UInput v-model.trim="model" required class="min-w-64" />
        <UButton class="" type="submit" color="secondary">{{ props.buttonLabel || "Find" }}</UButton>
      </UButtonGroup>
    </fieldset>
  </form>
</template>