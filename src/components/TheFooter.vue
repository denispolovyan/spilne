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
      class="border-2 border-slate-300 mb-4 py-6 rounded-xl flex justify-center bg-slate-300 hover:bg-neutral-600 text-neutral-600 hover:text-slate-200 duration-700"
    >
      <ChevronUpIcon class="h-14 " />
    </div>
  </div>
</template>
