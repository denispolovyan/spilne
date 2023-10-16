<script setup>
import { watch, ref } from "vue";

const props = defineProps({
  usersAndSum: {
    type: Array,
    required: true,
  },
});

const isNotNull = ref(false);

watch(
  () => props.usersAndSum,
  () => {
    isNotNull.value = false;
    props.usersAndSum.forEach((el) => {
      if (el.sum != 0) {
        isNotNull.value = true;
      }
    });
  },
  { deep: true }
);
</script>

<template>
  <div>
    <div class="spilne-container py-4">
      <div>
        <v-table>
          <thead>
            <tr v-if="isNotNull">
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
        </v-table>
      </div>
    </div>
  </div>
</template>
