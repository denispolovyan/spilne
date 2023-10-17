<script setup>
import { watch, ref, onMounted } from "vue";

const props = defineProps({
  usersAndSum: {
    type: Array,
    required: true,
  },
});

const isNotNull = ref(false);
const totalSum = ref(0);

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
    newTotalSum += el.sum;
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
    <div class="spilne-container py-4 border-b-2 border-stone-500" v-if="isNotNull">
      <div>
        <v-table theme="dark">
          <thead>
            <tr>
              <th class="text-left pl-12" >Name</th>
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
      </div>
    </div>
  </div>
</template>
