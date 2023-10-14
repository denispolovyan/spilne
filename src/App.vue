<script setup>
import TheHeader from "./components/TheHeader.vue";

import { ref } from "vue";

let users = ref([]);

function createUser(user) {
  users.value.push(user);
}
</script>

<template>
  <the-header :users="users" @createUser="createUser($event)" />
</template>

<style>
.spilne-container {
  max-width: 530px;
  padding: 0px 15px;
  margin: 0px auto;
}
</style>
