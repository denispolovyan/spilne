<script setup>
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";

const emits = defineEmits({
  hideMenu: {
    required: false,
  },
});
</script>

<template>
  <div
    @click="emits('hideMenu')"
    class="my-2 border-2 border-slate-300 mb-4 py-6 rounded-md flex justify-center hover:bg-slate-300 bg-neutral-500 hover:text-neutral-600 text-slate-200 duration-700 cursor-pointer"
  >
    <ArrowUturnLeftIcon class="w-12" />
  </div>
</template>
