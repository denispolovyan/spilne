<script setup>

const props = defineProps({
  usersAndSum: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <div>
    <div class="spilne-container py-4">
      <div>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Sum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in props.usersAndSum" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.sum }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
