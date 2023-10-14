<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheUsers from "./components/TheUsers.vue";
import TheSelectedUsers from "./components/TheSelectedUsers.vue";

import { ref } from "vue";

let users = ref(["Denys", "Nika", "julia"]);

let selectedUsers = ref([]);

function createUser(user) {
  users.value.push(user);
}

function createInput() {
  console.log("input created");
}

function deleteSelectedUser(user) {
  selectedUsers.value = selectedUsers.value.filter((t) => t != user);
}

function deleteUsers() {
  selectedUsers.value.forEach((user) => {
    users.value = users.value.filter((t) => t != user);
  });
  selectedUsers.value = [];
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
      @deleteUser="deleteSelectedUser($event)"
    />
    <the-selected-users
      :selectedUsers="selectedUsers"
      @deleteUsers="deleteUsers()"
      @createInput="createInput()"
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
