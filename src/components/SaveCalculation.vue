<script setup>
import { BookmarkIcon, FolderMinusIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const emits = defineEmits({
  saveCalculation: {
    required: false,
  },
  deleteCalculation: {
    required: false,
  },
});

const buttonClasses =
  "mt-2 border-2 rounded-md flex justify-center p-4 text-slate-200 hover:text-neutral-600 cursor-pointer duration-1000 hover:bg-slate-300 bg-neutral-500";
</script>

<template>
  <div>
    <div
      v-if="props.type == 'create'"
      :class="buttonClasses"
      @click="emits('saveCalculation')"
    >
      <BookmarkIcon class="h-12" />
    </div>
    <div v-else :class="buttonClasses" @click="emits('deleteCalculation')">
      <FolderMinusIcon class="h-12" />
    </div>
  </div>
</template>
