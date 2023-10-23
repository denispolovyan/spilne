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
      if ((isNaN(el) == true && el != " ") || el < 0) {
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
  "border-2 border-red-600 h-14 w-14 rounded-md flex items-center justify-center hover:bg-red-700 duration-1000 cursor-pointer basis-14 neon-red text-red-200 hover:text-white";

const calculatedSumClasses =
  "w-14 border-2 border-amber-500 text-amber-200 duration-1000 cursor-pointer hover:bg-amber-600 hover:text-white rounded-md flex items-center justify-center tracking-wider font-semibold neon-orange";

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
                class="tracking-wider font-semibold bg-violet-800 p-1 rounded-md text-slate-200 neon-blue"
              >
                <p>{{ user }}</p>
              </div>
            </div>
          </div>
          <div class="flex gap-4 text-slate-200">
            <v-text-field
				class="neon-input"
              v-model="sum"
              label="Sum"
              :maxlength="MAX_LENGTH"
              hide-details="auto"
              @input="calculateSum()"
            />
            <div class="flex gap-2">
              <div :class="calculatedSumClasses">
                {{ calculatedSum }}
              </div>
              <div
                :class="buttonClasses"
                @click="emits('deleteInput', props.id)"
              >
                <TrashIcon class="h-12 p-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-red {
  -moz-box-shadow: 0px 0px 14px #c41212;
  -webkit-box-shadow: 0px 0px 14px #c41212;
  box-shadow: 0px 0px 14px #c41212;
}
.neon-orange {
  -moz-box-shadow: 0px 0px 14px #8f7c0f;
  -webkit-box-shadow: 0px 0px 14px #786d0e;
  box-shadow: 0px 0px 14px #898f0e;
}

.neon-blue {
  -moz-box-shadow: 0px 0px 7px #1c8ad9;
  -webkit-box-shadow: 0px 0px 7px #1c95d6;
  box-shadow: 0px 0px 7px #1590dd;
}

.neon-input {
  -moz-box-shadow: 0px 0px 7px #8f8d0f;
  -webkit-box-shadow: 0px 0px 7px #75780e;
  box-shadow: 0px 0px 7px #868f0e;
}
</style>
