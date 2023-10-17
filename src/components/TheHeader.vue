<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";

import { ref, onMounted, onBeforeUnmount } from "vue";

const emits = defineEmits({
  createUser: {
    type: String,
    required: true,
  },
});

const props = defineProps({
  users: {
    type: Array,
    required: false,
  },
});

const username = ref("");

let inputError = ref(false);

function addUser() {
  let user = username.value;
  let coincidence = false;

  user.split('').forEach(el => {
	if(!/^[A-Za-z\s]+$/.test(el)) coincidence = true
  })

  props.users.forEach((el) => {
    if (el == user) {
      coincidence = true;
    }
  });

  if (
    user.length >= 2 &&
    !Boolean(Number(user)) &&
    Boolean(user.trim()) &&
    !coincidence
  ) {
    emits("createUser", user);
    username.value = "";
  } else {
    inputError.value = true;
  }
}

function handleKeydown(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addUser();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});

const buttonClasses =
  "bg-green-500 h-14 w-14 rounded-md flex items-center justify-center hover:bg-green-700 duration-1000 cursor-pointer basis-14";
</script>

<template>
  <div class="pt-4" id="header">
    <div class="spilne-container">
      <div class="flex items-center justify-between gap-2">
        <div class="flex basis-5/6">
          <v-text-field
            :class="{
              'text-red-600': inputError,
            }"
            @click="inputError = false"
            v-model="username"
            label="Name"
            maxlength="12"
            hide-details="auto"
          />
        </div>
        <div :class="buttonClasses" @click="addUser()">
          <plus-icon class="h-12 text-white p-1" />
        </div>
      </div>
    </div>
  </div>
</template>
