<script setup>
const MAX_LENGTH = 12;

import { UserPlusIcon, Bars3Icon } from "@heroicons/vue/24/outline";

import { ref, onMounted, onBeforeUnmount } from "vue";

const emits = defineEmits({
  createUser: {
    type: String,
    required: true,
  },
  showMenu: {
    required: false,
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

  user.split("").forEach((el) => {
    if (!/^[A-Za-z\s]+$/.test(el) && !/^[А-Яа-яҐґЄєІіЇї\s]+$/.test(el))
      coincidence = true;
  });

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
  "h-14 w-14 rounded-md flex items-center justify-center duration-700 cursor-pointer basis-14";
</script>

<template>
  <div class="pt-4" id="header">
    <div class="spilne-container">
      <div class="flex items-center justify-between gap-2">
        <div class="flex basis-3/4">
          <v-text-field
            :class="{
              'text-red-400': inputError,
              'text-slate-200': !inputError,
            }"
            @click="inputError = false"
            v-model="username"
            label="Name"
            :maxlength="MAX_LENGTH"
            hide-details="auto"
				class="neon-input"
          />
        </div>
        <div class="flex gap-2">
          <UserPlusIcon
            :class="buttonClasses"
            class="border-2 h-12 text-pink-200 p-1 border-pink-500 hover:bg-pink-800 hover:text-white neon-pink"
            @click="addUser()"
          />
          <Bars3Icon
            :class="buttonClasses"
            class="border-2 h-12 text-purple-200 p-1 border-purple-600 hover:bg-purple-800 hover:text-white neon-violet"
            @click="emits('showMenu')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-pink {
  -moz-box-shadow: 0px 0px 14px #c412b2;
  -webkit-box-shadow: 0px 0px 14px #c412b8;
  box-shadow: 0px 0px 14px #c41289;
}
.neon-violet {
  -moz-box-shadow: 0px 0px 14px #8f0f82;
  -webkit-box-shadow: 0px 0px 14px #780e71;
  box-shadow: 0px 0px 14px #8f0e64;
}
.neon-input {
  -moz-box-shadow: 0px 0px 7px #0f8f89;
  -webkit-box-shadow: 0px 0px 7px #0e7873;
  box-shadow: 0px 0px 7px #0e8f8d;
}
</style>
