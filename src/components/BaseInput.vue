<script setup>
const MAX_LENGTH = 200;
const MAX_SUM = 99999;

import { ref, onMounted } from "vue";

import { TrashIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits({
  createInput: {
    type: Object,
    required: true,
  },
  changeSum: {
    type: Array,
    required: true,
  },
  deleteInput: {
    type: Number,
    required: true,
  },
});

const sum = ref("");
const calculatedSum = ref(0);

function calculateSum() {
  let sumArray = [];
  let rawSum = 0;

  if (typeof sum.value == "string") {
    sumArray = sum.value.split(" ");
  }

  if (sumArray.length) {
    sumArray.forEach((el) => {
      if (isNaN(el) == true && el != " ") {
        sumArray = sumArray.filter((t) => t != el);
      }
    });
    sum.value = sumArray.join(" ");
  }

  if (sumArray.length) {
    sumArray.forEach((el) => {
      rawSum = rawSum + +el;
      while (rawSum > MAX_SUM) {
        rawSum = 0;
        sum.value = sum.value.toString().slice(0, -1);
        sumArray = sum.value.split(" ");
        sumArray.forEach((el) => {
          rawSum = rawSum + +el;
        });
      }
    });
  } else {
    rawSum = sum.value;
  }

  calculatedSum.value = rawSum || 0;

  emits("changeSum", [props.id, calculatedSum.value || 0]);
}

const buttonClasses =
  "bg-red-600 h-14 w-14 rounded-md flex items-center justify-center hover:bg-red-700 duration-1000 cursor-pointer basis-14";

onMounted(() => {
  sum.value = props.sum || "";
  calculateSum();
});
</script>

<template>
  <div class="pt-4" v-if="users.length">
    <div class="spilne-container">
      <div class="pb-4 border-b-2 border-stone-500">
        <div class="flex flex-col gap-3">
          <div class="flex gap-4 flex-wrap gap-x-2 gap-y-1">
            <div v-for="user in props.users" :key="user">
              <div
                class="tracking-wider font-semibold bg-violet-800 p-1 rounded-md text-slate-200"
              >
                <p>{{ user }}</p>
              </div>
            </div>
          </div>
          <div class="flex gap-4 text-slate-200">
            <v-text-field
              inputmode="tel"
              v-model="sum"
              label="Sum"
              :maxlength="MAX_LENGTH"
              hide-details="auto"
              @input="calculateSum()"
            />
            <div class="flex gap-2">
              <div
                class="w-14 bg-amber-500 duration-1000 cursor-pointer hover:bg-amber-700 text-slate-100 hover:text-slate-300 rounded-md flex items-center justify-center tracking-wider font-semibold"
              >
                {{ calculatedSum }}
              </div>
              <div
                :class="buttonClasses"
                @click="emits('deleteInput', props.id)"
              >
                <TrashIcon class="h-12 p-1 text-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
