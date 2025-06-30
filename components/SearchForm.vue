<script setup lang='ts'>
const model = defineModel<string>()
const props = defineProps<{ buttonLabel?: string }>()
</script>
<template>
  <form class="w-full max-w-1/2">
    <fieldset class="border  border-zinc-200 p-2 rounded-sm ">
      <legend class="p-2">
        <slot />
      </legend>
      <UButtonGroup class="w-full">
        <UInput v-model.trim="model" required class="w-full" />
        <UButton class="min-w-fit" type="submit" color="secondary">{{ props.buttonLabel || "Find" }}</UButton>
      </UButtonGroup>
    </fieldset>
  </form>
</template>