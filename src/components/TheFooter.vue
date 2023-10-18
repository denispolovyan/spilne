<script setup>
import { ChevronUpIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div
    class="spilne-container cursor-pointer"
    v-scroll-to="{
      el: '#header',
      duration: 800,
    }"
  >
    <div
      class="border-2 border-slate-300 mb-4 py-6 rounded-md flex justify-center hover:bg-slate-300 bg-neutral-500 hover:text-neutral-600 text-slate-200 duration-700"
    >
      <ChevronUpIcon class="h-14 " />
    </div>
  </div>
</template>
