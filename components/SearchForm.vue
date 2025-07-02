<script setup lang='ts'>
const model = defineModel<string>()
const props = defineProps<{ buttonLabel?: string, disabled?: boolean, title?: string }>()
</script>
<template>
  <form class="w-full max-w-1/3">
    <fieldset class="border  border-zinc-200 p-2 rounded-sm ">
      <legend class="p-2">
        <slot />
      </legend>
      <p v-if="props.disabled">
        Disabled:
        <span class="text-red-700"> {{ props.title }} </span>
      </p>
      <UButtonGroup class="w-full">
        <UInput v-model.trim="model" required class="w-full" :disabled="props.disabled" />
        <UButton class="min-w-fit" type="submit" color="secondary" :disabled="props.disabled">
          {{ props.buttonLabel || "Find" }}
        </UButton>
      </UButtonGroup>
    </fieldset>
  </form>
</template>