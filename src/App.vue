<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheUsers from "./components/TheUsers.vue";
import TheSelectedUsers from "./components/TheSelectedUsers.vue";
import BaseInput from "./components/BaseInput.vue";

import { ref } from "vue";

let users = ref(["Denys", "Nika", "Yuliya"]);

let selectedUsers = ref([]);

let inputs = ref([{ users: users.value, id: 1, sum: 0 }]);

function createUser(user) {
  users.value.push(user);
}

function createInput(users) {
  let allInputsUsers = [];
  let usersArray = [];
  let coincidence = [];
  let exactCoincidence = false;

  users.forEach((el) => {
    usersArray.push(el);
  });

  inputs.value.forEach((el) => {
    let objectToArray = [];

    el.users.forEach((el) => {
      objectToArray.push(el);
    });

    allInputsUsers.push(objectToArray);
    objectToArray = [];
  });

  allInputsUsers.forEach((el) => {
    let mas1 = el;

    let mas2 = usersArray;

    let overlap = [];
    if (mas1.length > mas2.length) {
      overlap.push(mas1.filter((a) => mas2.indexOf(a) == -1));
    } else {
      overlap.push(mas2.filter((a) => mas1.indexOf(a) == -1));
    }

    let ifOverlapNull = true;
    overlap.forEach((el) => {
      if (el) {
        ifOverlapNull = false;
      }
    });

    if (!ifOverlapNull) {
      coincidence.push(overlap);
    }
  });

  coincidence.forEach((el) => {
    el.forEach((el) => {
      if (!el.length) {
        exactCoincidence = true;
      }
    });
  });

  if (!exactCoincidence) {
    const input = {
      users: usersArray,
      id: inputs.value.length + 1,
      sum: 0,
    };

    inputs.value.push(input);
  }
}

function deleteSelectedUsers() {
  selectedUsers.value = [];
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

function deleteInput(id) {
  inputs.value = inputs.value.filter((el) => el.id != id);
}

function setSelectedUsers(user) {
  selectedUsers.value.push(user);
}

function changeSum(data) {
  const id = data[0];

  inputs.value.find((t) => (t.id = id)).sum = data[1];
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
      @createInput="createInput($event)"
      @deleteSelectedUsers="deleteSelectedUsers()"
    />
    <div v-for="input in inputs" :key="input.id">
      <base-input
        :users="input.users"
        :id="input.id"
        @changeSum="changeSum($event)"
        @deleteInput="deleteInput($event)"
      />
    </div>
  </div>
</template>

<style>
.spilne-container {
  max-width: 530px;
  padding: 0px 15px;
  margin: 0px auto;
}
</style>
