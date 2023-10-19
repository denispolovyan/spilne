<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheUsers from "./components/TheUsers.vue";
import TheSelectedUsers from "./components/TheSelectedUsers.vue";
import BaseInput from "./components/BaseInput.vue";
import BaseTable from "./components/BaseTable.vue";
import NoInputs from "./components/NoInputs.vue";
import NoDebts from "./components/NoDebts.vue";
import TheFooter from "./components/TheFooter.vue";
import TheMenu from "./components/TheMenu.vue";

import { ref, watch, onMounted } from "vue";

let users = ref(["Denys", "Nika", "Yuliya", "Mykyta"]);

let usersAndSum = ref([]);

let selectedUsers = ref([]);

let calculationHistory = ref([]);

let inputs = ref([]);

let isDebts = ref(false);

let showMenu = ref(false);

// refs

const header = ref(null);

function createUser(user) {
  users.value.push(user);

  localStorage.setItem("users", JSON.stringify(users.value));
}

function deleteUsers() {
  selectedUsers.value.forEach((user) => {
    users.value = users.value.filter((t) => t != user);
  });
  selectedUsers.value = [];

  if (!users.value.length) inputs.value = [];

  localStorage.setItem("users", JSON.stringify(users.value));
  localStorage.setItem("inputs", JSON.stringify(inputs.value));
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

  deleteSelectedUsers();

  localStorage.setItem("inputs", JSON.stringify(inputs.value));
}

function deleteInput(id) {
  inputs.value = inputs.value.filter((el) => el.id != id);
  calculateUsersSum();

  localStorage.setItem("inputs", JSON.stringify(inputs.value));
}

function changeSum(data) {
  const id = data[0];

  inputs.value.find((t) => t.id == id).sum = data[1];

  calculateUsersSum();
  if (!usersAndSum.value.length) {
    createUsersSum();
  }
  localStorage.setItem("inputs", JSON.stringify(inputs.value));
}

function setSelectedUsers(user) {
  selectedUsers.value.push(user);
}

function deleteSelectedUsers() {
  selectedUsers.value = [];
}

function deleteSelectedUser(user) {
  selectedUsers.value = selectedUsers.value.filter((t) => t != user);
}

function createUsersSum() {
  let coincidence = false;
  users.value.forEach((user1) => {
    usersAndSum.value.forEach((user2) => {
      if (user2.name == user1) {
        coincidence = true;
      }
    });

    if (!coincidence) {
      usersAndSum.value.push({ name: user1, sum: 0 });
    }
    coincidence = false;
  });

  deleteUserSum();
  localStorage.setItem("users-sums", JSON.stringify(usersAndSum.value));
}

function calculateUsersSum() {
  usersAndSum.value.forEach((user) => {
    let sum = 0;

    inputs.value.forEach((input) => {
      if (input.users.includes(user.name)) {
        sum = Math.round(sum + input.sum / input.users.length);
      }
    });

    user.sum = sum;
  });
  localStorage.setItem("users-sums", JSON.stringify(usersAndSum.value));
}

function deleteUserSum() {
  let coincidence = false;

  usersAndSum.value.forEach((user1) => {
    users.value.forEach((user2) => {
      if (user2 == user1.name) {
        coincidence = true;
      }
    });

    if (!coincidence) {
      usersAndSum.value = usersAndSum.value.filter((t) => t.name != user1.name);
    }
    coincidence = false;
  });
  localStorage.setItem("users-sums", JSON.stringify(usersAndSum.value));
}

function watchDebtState() {
  isDebts.value = false;
  usersAndSum.value.forEach((el) => {
    if (el.sum != 0) {
      isDebts.value = true;
    }
  });
}

function saveCalculation(data) {
  let calculationToSave = usersAndSum.value;
  calculationToSave.unshift(data);

  calculationHistory.value.unshift(calculationToSave);
  usersAndSum.value = [];
  inputs.value = [];

  localStorage.setItem("inputs", JSON.stringify(inputs.value));
  localStorage.setItem("users-sums", JSON.stringify(usersAndSum.value));
  localStorage.setItem(
    "calculation-history",
    JSON.stringify(calculationHistory.value)
  );
}

function deleteCalculation(calculation) {
  calculationHistory.value = calculationHistory.value.filter(
    (t) => t != calculation
  );
  localStorage.setItem(
    "calculation-history",
    JSON.stringify(calculationHistory.value)
  );
}

watch(
  () => usersAndSum.value,
  () => {
    watchDebtState();
  },
  { deep: true }
);

watch(
  () => users,
  () => {
    createUsersSum();
  },
  { deep: true }
);

// onMounted ====>

onMounted(() => {
  setTimeout(() => {}, 200);
  createUsersSum();

  let getUsers = localStorage.getItem("users");
  if (JSON.parse(getUsers)) {
    users.value = JSON.parse(getUsers);
  }

  let getInputs = localStorage.getItem("inputs");
  if (JSON.parse(getInputs)) {
    inputs.value = JSON.parse(getInputs);
  }

  let getCalculationHistory = localStorage.getItem("calculation-history");
  if (JSON.parse(getCalculationHistory)) {
    calculationHistory.value = JSON.parse(getCalculationHistory);
  }

  let getUsersAndSums = localStorage.getItem("users-sums");
  if (JSON.parse(getUsersAndSums)) {
    JSON.parse(getUsersAndSums).forEach((newUser) => {
      usersAndSum.value.forEach((user) => {
        if (user.name == newUser.name) {
          user.sum = newUser.sum;
        }
      });
    });
  }

  watchDebtState();
});
</script>

<template>
  <div class="flex flex-col h-screen" v-if="!showMenu">
    <the-header
      :users="users"
      @showMenu="showMenu = true"
      @createUser="createUser($event)"
      ref="header"
    />
    <div class="grow">
      <the-users
        id="users"
        :users="users"
        :selectedUsers="selectedUsers"
        @selectUser="setSelectedUsers($event)"
        @deleteUser="deleteSelectedUser($event)"
      />
      <the-selected-users
        :selectedUsers="selectedUsers"
        @deleteUsers="deleteUsers()"
        @createInput="createInput($event)"
      />
      <div v-if="inputs.length" id="inputs">
        <div v-for="input in inputs" :key="input.id">
          <base-input
            :sum="input.sum"
            :users="input.users"
            :id="input.id"
            @changeSum="changeSum($event)"
            @deleteInput="deleteInput($event)"
          />
        </div>
      </div>
      <no-inputs class="pb-8" v-else />

      <base-table
        class="pb-8 spilne-container"
        v-if="inputs.length"
        :usersAndSum="usersAndSum"
        :type="'create'"
        @addCalcInfo="saveCalculation($event)"
      />
      <no-debts class="pb-8" v-if="!isDebts && inputs.length" />
    </div>

    <the-footer clas="w-screen" />
  </div>
  <div v-else>
    <the-menu
      @hideMenu="showMenu = false"
      @deleteCalculation="deleteCalculation($event)"
      :calculationHistory="calculationHistory"
    />
  </div>
</template>

<style>
html {
  height: 100vh;
  padding-bottom: 20px;
  background-color: rgb(82 82 82);
}
body {
  height: 100vh;
}
#app {
  height: 100vh;
}
.spilne-container {
  width: 530px;
  padding: 0px 15px;
  margin: 0px auto;
}
@media (max-width: 560px) {
  .spilne-container {
    width: 100%;
    padding: 0px 15px;
    margin: 0px auto;
  }
}
</style>
