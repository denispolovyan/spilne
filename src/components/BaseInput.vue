<script setup>
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

const sum = ref('');
const calculatedSum = ref(0);

function calculateSum() {
  let sumArray = [];
  let rawSum = 0;
  if (typeof sum.value == "string") {
    sumArray = sum.value.split(" ");
  }

  if (sumArray.length) {
    sumArray.forEach((el) => {
      rawSum = rawSum + +el;
    });
  } else {
    rawSum = sum.value;
  }

  calculatedSum.value = rawSum;
  emits("changeSum", [props.id, calculatedSum.value]);
}

const buttonClasses =
  "bg-red-500 h-14 w-14 rounded-md flex items-center justify-center hover:bg-red-700 duration-1000 cursor-pointer basis-14";

onMounted(() => {
  sum.value = props.sum || '';
  calculateSum();
});
</script>

<template>
  <div class="py-4" v-if="users.length">
    <div class="spilne-container">
      <div>
        <div>
          <div class="flex flex-col gap-3">
            <div class="flex gap-4 flex-wrap gap-x-2 gap-y-1">
              <div v-for="user in props.users" :key="user">
                <div
                  class="tracking-wider font-semibold bg-cyan-700 p-1 text-white rounded-md"
                >
                  <p>{{ user }}</p>
                </div>
              </div>
            </div>
            <div class="flex gap-4">
              <v-text-field
                class=""
                v-model="sum"
                label="Sum"
                maxlength="60"
                hide-details="auto"
                @input="calculateSum()"
              />
              <div class="flex gap-2">
                <div
                  class="w-14 bg-amber-500 duration-1000 cursor-pointer hover:bg-amber-700 text-white rounded-md flex items-center justify-center tracking-wider font-semibold"
                >
                  {{ calculatedSum }}
                </div>
                <div
                  :class="buttonClasses"
                  @click="emits('deleteInput', props.id)"
                >
                  <TrashIcon class="h-12 text-white p-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
