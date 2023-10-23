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
  "border-2 border-violet-700 text-violet-100 tracking-wider py-3 px-3 rounded-md text-md font-semibold cursor-pointer hover:bg-violet-600 duration-500 hover:text-white neon-blue";

const buttonClasses =
  " h-12 w-12 rounded-md flex items-center justify-center  duration-1000 cursor-pointer basis-14";
  
</script>

<template>
  <div v-if="props.selectedUsers.length" class="pt-4">
    <div class="spilne-container border-b-2 border-stone-500 pb-4">
      <div class="flex justify-between gap-4">
        <div class="flex gap-2 flex-wrap basis-3/4 items-center">
          <div v-for="user in props.selectedUsers" :key="user">
            <div :class="userClasses" class="pink-neon-text">
              <span >{{ user }}</span>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <div
            :class="buttonClasses"
            class="border-2 border-red-600 hover:bg-red-700 w-14 h-14 text-red-200 hover:text-white neon-red"
            @click="emits('deleteUsers')"
          >
            <UserMinusIcon class="h-12 p-1"/>
          </div>
          <div
            :class="buttonClasses"
            @click="emits('createInput', props.selectedUsers)"
            class="border-2 border-lime-600 text-lime-200 hover:bg-lime-700 w-14 h-14 hover:text-white neon-green"
          >
            <PlusIcon class="h-12 p-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.neon-red {
  -moz-box-shadow: 0px 0px 14px #c41212;
  -webkit-box-shadow: 0px 0px 14px #c41212;
  box-shadow: 0px 0px 14px #c41212;
}
.neon-green {
  -moz-box-shadow: 0px 0px 14px #268f0f;
  -webkit-box-shadow: 0px 0px 14px #0e7815;
  box-shadow: 0px 0px 14px #178f0e;
}
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
