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
		emits("deleteUser", user)
    }
  });

  if (!coincidence) {
    emits("selectUser", user);
  }
}

const userClasses =
  "tracking-wider py-2 px-4 bg-blue-600 rounded-md text-xl text-white font-semibold cursor-pointer hover:bg-yellow-500 duration-500";
</script>

<template>
  <div
    class="py-4"
    :class="{
      'border-b': props.users.length,
    }"
  >
    <div class="spilne-container">
      <div class="flex gap-2 flex-wrap">
        <div v-for="user in props.users" :key="user" class="">
          <div :class="userClasses" @click="selectUser(user)">
            <span>{{ user }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
