<script setup>
import { UserMinusIcon, PlusIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  selectedUsers: {
    type: Array,
    required: false,
  },
});

const emits = defineEmits([
  "deleteUsers",
  "createInput",
  "deleteSelectedUsers",
]);

const userClasses =
  "tracking-wider py-3 px-4 bg-blue-800 rounded-md text-xl text-white font-semibold cursor-pointer hover:bg-yellow-600 duration-500";

const buttonClasses =
  " h-14 w-14 rounded-md flex items-center justify-center  duration-1000 cursor-pointer basis-14";
</script>

<template>
  <div v-if="props.selectedUsers.length" class="py-4 border-b">
    <div class="spilne-container">
      <div class="flex justify-between">
        <div class="flex gap-2 flex-wrap basis-3/4">
          <div v-for="user in props.selectedUsers" :key="user" class="">
            <div :class="userClasses">
              <span>{{ user }}</span>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <div
            :class="buttonClasses"
            class="bg-red-500 hover:bg-red-700"
            @click="emits('deleteUsers')"
          >
            <UserMinusIcon class="h-12 text-white p-1" />
          </div>
          <div
            :class="buttonClasses"
            @click="
              emits('createInput', props.selectedUsers),
                emits('deleteSelectedUsers')
            "
            class="bg-yellow-500 hover:bg-yellow-700"
          >
            <PlusIcon class="h-12 text-white p-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
