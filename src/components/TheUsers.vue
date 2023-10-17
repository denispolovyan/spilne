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
  "tracking-wider py-3 px-2 bg-violet-800 rounded-md text-md text-slate-200 font-semibold cursor-pointer hover:bg-violet-700 duration-500";
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
          <div :class="userClasses" @click="selectUser(user)">
            <span>{{ user }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
