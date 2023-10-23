<script setup>
import { ref } from "vue";

const props = defineProps({
  users: {
    type: Array,
    reuired: false,
  },
  selectedUsers: {
    type: Array,
    required: false,
  },
});

const emits = defineEmits({
  selectUser: {
    type: String,
    reuired: false,
  },
  deleteUser: {
    type: String,
    required: false,
  },
});

function selectUser(user) {
  let coincidence = false;

  props.selectedUsers.forEach((el) => {
    if (el == user) {
      coincidence = true;
      emits("deleteUser", user);
    }
  });

  if (!coincidence) {
    emits("selectUser", user);
  }
}

const userClasses =
  "border-2 border-violet-700 text-violet-100 tracking-wider py-3 px-3 rounded-md text-md font-semibold cursor-pointer hover:bg-violet-600 duration-500 hover:text-white neon-blue";
</script>

<template>
  <div class="pt-4">
    <div
      class="spilne-container"
      :class="{
        'border-b-2 border-stone-500 pb-4': props.users.length,
      }"
    >
      <div class="flex gap-2 flex-wrap">
        <div v-for="user in props.users" :key="user">
          <div :class="userClasses" @click="selectUser(user)" class="pink-neon-text">
            <span>{{ user }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-blue {
  -moz-box-shadow: 0px 0px 7px #1c32d9;
  -webkit-box-shadow: 0px 0px 7px #1c1fd6;
  box-shadow: 0px 0px 7px #2615dd;
}
.pink-neon-text:hover {
  color: #ffffff;
  text-shadow: 0 0 2px #ffffff, 0 0 5px #ff00dd6f, 0 0 10px #ff00dd6c,
    0 0 11px #ff00dd77, 0 0 12px rgba(255, 0, 221, 0.527),
    0 0 19px rgba(255, 0, 221, 0.455);
}
</style>
