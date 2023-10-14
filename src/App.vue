<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheUsers from "./components/TheUsers.vue";

import { ref } from "vue";

let users = ref(["Denys", "Nika", "julia"]);

let selectedUsers = ref([]);

function createUser(user) {
  users.value.push(user);
}
function setSelectedUsers(user) {
  selectedUsers.value.push(user);
}
</script>

<template>
  <div>
    <the-header :users="users" @createUser="createUser($event)" />
    <the-users
      :users="users"
      :selectedUsers="selectedUsers"
      @selectUser="setSelectedUsers($event)"
    />
  </div>
</template>

<style>
.spilne-container {
  max-width: 530px;
  padding: 0px 15px;
  margin: 0px auto;
}
</style>
