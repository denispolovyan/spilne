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
    <div class="spilne-container py-4">
      <div>
        <v-table>
          <thead v-if="isNotNull">
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Sum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in props.usersAndSum" :key="item.name">
              <td v-if="item.sum">{{ item.name }}</td>
              <td v-if="item.sum">{{ item.sum }}</td>
            </tr>
          </tbody>
          <tbody v-if="isNotNull">
            <tr>
              <td class="font-semibold">Total</td>
              <td>{{ totalSum }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
