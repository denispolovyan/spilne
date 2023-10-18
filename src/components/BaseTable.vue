<script setup>
import SaveCalculation from "./SaveCalculation.vue";

import { watch, ref, onMounted } from "vue";

const props = defineProps({
  usersAndSum: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
});

const emits = defineEmits({
  addCalcInfo: {
    type: Object,
    required: false,
  },
  deleteCalculation: {
    type: Array,
    required: false,
  },
});

const isNotNull = ref(false);
const totalSum = ref(0);
const tableInfoClasses =
  "mt-2 border-2 rounded-md  p-4 text-slate-200 hover:text-neutral-600 cursor-pointer duration-1000 hover:bg-slate-300 bg-neutral-500 mb-2 text-xl";

function watchDebtState() {
  isNotNull.value = false;
  props.usersAndSum.forEach((el) => {
    if (el.sum != 0) {
      isNotNull.value = true;
    }
  });
}

function calculateTotalSum() {
  let newTotalSum = 0;
  props.usersAndSum.forEach((el) => {
    if (el.sum) newTotalSum += el.sum;
  });

  totalSum.value = newTotalSum;
}

watch(
  () => props.usersAndSum,
  () => {
    watchDebtState();
    calculateTotalSum();
  },
  { deep: true }
);

onMounted(() => {
  calculateTotalSum();
  watchDebtState();
});
</script>

<template>
  <div>
    <div
      class=" py-4 border-b-2 border-stone-500"
      v-if="isNotNull"
    >
      <div>
        <div v-if="props.type == 'reset'" :class="tableInfoClasses">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <div>{{ props.usersAndSum[0].paid }}</div>
              <div>{{ props.usersAndSum[0].date }}</div>
            </div>
            <div class="">{{ props.usersAndSum[0].notes }}</div>
          </div>
        </div>
        <v-table theme="dark ">
          <thead>
            <tr>
              <th class="text-left pl-12">Name</th>
              <th class="text-center">Sum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in props.usersAndSum" :key="item.name">
              <td v-if="item.sum" class="pl-12">{{ item.name }}</td>
              <td v-if="item.sum" class="text-center">{{ item.sum }}</td>
            </tr>
          </tbody>
          <tbody class="border-t">
            <tr>
              <td class="font-semibold pl-12">Total</td>
              <td class="text-center">{{ totalSum }}</td>
            </tr>
          </tbody>
        </v-table>
        <save-calculation
          :type="props.type"
          @addCalcInfo="emits('addCalcInfo', $event)"
          @deleteCalculation="emits('deleteCalculation', props.usersAndSum)"
        />
      </div>
    </div>
  </div>
</template>
