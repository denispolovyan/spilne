<script setup>
import SaveCalculation from "./SaveCalculation.vue";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentArrowDownIcon,
} from "@heroicons/vue/24/outline";

import { watch, ref, onMounted } from "vue";

import { jsPDF } from "jspdf";

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

const showTable = ref(false);
const isNotNull = ref(false);
const totalSum = ref(0);
const tableInfoClasses =
  "mt-2 border-2 rounded-md  p-4 text-slate-200 hover:text-neutral-600 cursor-pointer duration-1000 hover:bg-slate-300 bg-neutral-500 mb-2 text-xl";
const iconClasses = "h-12 cursor-pointer";
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

function generatePdf() {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a5",
      putOnlyUsedFonts: true,
    });

    let dataString = "";

    dataString += `Date:  ${props.usersAndSum[0].date} \n\n`;
    dataString += `Paid:  ${props.usersAndSum[0].paid} \n\n`;
    dataString += `Notes:  ${props.usersAndSum[0].notes} \n\n\n`;

    dataString += 'Purchasers:\n\n';


    props.usersAndSum.forEach((el) => {
      if (el.sum && el.name) {
        dataString += el.name;
        dataString += ": ";
        dataString += el.sum;
        dataString += "\n\n";
      }
    });

    dataString += `Total: ${totalSum.value}\n\n`;

    doc.text(dataString, 45, 25, {
      align: "left",
		maxWidth: 50,		
    });
    doc.save(`${props.usersAndSum[0].date}_${props.usersAndSum[0].paid}.pdf`);
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
    <div class="pb-4 border-b-2 border-stone-500" v-if="isNotNull">
      <div>
        <div v-if="props.type == 'reset'" :class="tableInfoClasses">
          <div
            class="flex flex-col gap-2"
            @click="showTable ? (showTable = false) : (showTable = true)"
          >
            <div class="flex justify-between">
              <div>{{ props.usersAndSum[0].paid }}</div>
              <div>{{ props.usersAndSum[0].date }}</div>
            </div>
            <div class="flex justify-between items-center gap-2">
              <div class="break-words w-2/3">
                {{ props.usersAndSum[0].notes }}
              </div>
              <div>
                <div class="flex gap-2 basis-1/2 w-full">
                  <ChevronDownIcon
                    v-if="!showTable"
                    :class="iconClasses"
                  /><ChevronUpIcon :class="iconClasses" v-else />
                  <DocumentArrowDownIcon
                    :class="iconClasses"
                    class="hover:text-red-400 duration-1000"
                    @click.stop="generatePdf()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-table
          id="myTable"
          theme="dark"
          v-if="props.type == 'create' || showTable"
        >
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
          v-if="props.type == 'create' || showTable"
          :type="props.type"
          @addCalcInfo="emits('addCalcInfo', $event)"
          @deleteCalculation="emits('deleteCalculation', props.usersAndSum)"
        />
      </div>
    </div>
  </div>
</template>
