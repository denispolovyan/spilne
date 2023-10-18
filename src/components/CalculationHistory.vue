<script setup>
import BaseTable from "./BaseTable.vue";
import NoDebts from "./NoDebts.vue";

const props = defineProps({
  calculationHistory: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits({
  deleteCalculation: {
    type: Array,
    required: false,
  },
});
</script>

<template>
  <div>
    <div v-if="props.calculationHistory.length">
      <div v-for="calculation in props.calculationHistory" :key="calculation">
        <base-table
          class="pb-8"
          :usersAndSum="calculation"
          :type="'reset'"
          @deleteCalculation="emits('deleteCalculation', $event)"
        />
      </div>
    </div>
    <div v-else>
      <no-debts class="mt-8" />
    </div>
  </div>
</template>
