<script setup>
import CalculationHistory from "./CalculationHistory.vue";
import AppTips from "./AppTips.vue";
import MenuHeader from "./MenuHeader.vue";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

import { ref } from "vue";

const emits = defineEmits({
  hideMenu: {
    required: false,
  },
  deleteCalculation: {
    type: Array,
    required: false,
  },
});

const props = defineProps({
  calculationHistory: {
    type: Array,
    required: false,
  },
});

let showItems = ref({
  history: false,
  tips: false,
});

const iconClasses = "h-12";
const itemClasses =
  "flex items-center justify-between h-24 p-4 rounded-md text-xl bg-neutral-500 hover:text-neutral-600 text-slate-200 duration-700 cursor-pointer hover:bg-slate-300";
</script>

<template>
  <div class="spilne-container pb-4">
    <menu-header @hideMenu="emits('hideMenu')" />

    <div class="flex flex-col gap-4">
      <div
        :class="itemClasses"
        @click="
          showItems.tips ? (showItems.tips = false) : (showItems.tips = true)
        "
      >
        <p>Tips</p>
        <div>
          <ChevronDownIcon
            v-if="!showItems.tips"
            :class="iconClasses"
          /><ChevronUpIcon v-else class="h-12" />
        </div>
      </div>

      <div v-if="showItems.tips" class="mb-4"><app-tips /></div>

      <div
        :class="itemClasses"
        @click="
          showItems.history
            ? (showItems.history = false)
            : (showItems.history = true)
        "
      >
        <p>History</p>
        <div>
          <ChevronDownIcon
            v-if="!showItems.history"
            :class="iconClasses"
          /><ChevronUpIcon v-else class="h-12" />
        </div>
      </div>
      <div v-if="showItems.history" class="mb-4">
        <calculation-history
          @deleteCalculation="emits('deleteCalculation', $event)"
          :calculationHistory="calculationHistory"
        />
      </div>
    </div>
  </div>
</template>
