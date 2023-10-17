<script setup>
import { UserMinusIcon, PlusIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  selectedUsers: {
    type: Array,
    required: false,
  },
});

const emits = defineEmits(["deleteUsers", "createInput"]);

const userClasses =
  "tracking-wider py-4 px-3 bg-violet-800 rounded-md text-md text-slate-200 font-semibold cursor-pointer hover:bg-violet-600 duration-500";

const buttonClasses =
  " h-12 w-12 rounded-md flex items-center justify-center  duration-1000 cursor-pointer basis-14";
</script>

<template>
  <div v-if="props.selectedUsers.length" class="pt-4">
    <div class="spilne-container border-b-2 border-stone-500 pb-4">
      <div class="flex justify-between gap-4">
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
            class="bg-red-600 hover:bg-red-700 w-14 h-14"
            @click="emits('deleteUsers')"
          >
            <UserMinusIcon class="h-12 text-slate-200 p-1" />
          </div>
          <div
            :class="buttonClasses"
            @click="emits('createInput', props.selectedUsers)"
            class="bg-lime-600 hover:bg-lime-700 w-14 h-14"
          >
            <PlusIcon class="h-12 text-white p-1 text-slate-200" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
