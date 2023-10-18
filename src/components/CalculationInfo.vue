<script setup>
import { ref, watch, onMounted } from "vue";

import Datepicker from "vue3-datepicker";

const emits = defineEmits({
  hideCalcInfo: {
    required: false,
  },
});

let disabled = ref(false);

const date = ref(new Date());

const name = ref("");

const notes = ref("");

function addCalcInfo() {
  const userDate =
    ("0" + date.value.getDate()).slice(-2) +
    "." +
    ("0" + (date.value.getMonth() + 1)).slice(-2) +
    "." +
    date.value.getFullYear();

  let userName = name.value;
  let userNotes = notes.value;

  let error = false;

  if (!error && notes) {
    console.log("success");
    console.log(userDate, userName, userNotes);
  }
}

function changeButtonState() {
  let userName = name.value;

  disabled.value = false;

  userName.split("").forEach((el) => {
    if (!/^[A-Za-z\s]+$/.test(el) && !/^[А-Яа-яҐґЄєІіЇї\s]+$/.test(el)) {
      disabled.value = true;
    }
  });

  if(! userName) disabled.value = true;
}

watch(
  () => name.value,
  () => changeButtonState()
);

onMounted(() => {
	changeButtonState()
})

const inputClasses =
  "bg-slate-100 h-14 rounded-md pl-2 text-xl hover:bg-slate-300 duration-500";
const datepickerClasses =
  "pl-2 text-xl bg-slate-100 h-14 py-4 rounded-md w-48 cursor-pointer hover:bg-slate-300 duration-500";
const buttonClasses =
  "bg-slate-100 h-14 rounded-md text-xl px-4 hover:bg-slate-300 duration-500";
</script>

<template>
  <div class="flex flex-col gap-4 font-semibold">
    <div class="flex justify-between mt-3">
      <Datepicker v-model="date" :class="datepickerClasses"></Datepicker>
      <div>
        <input
          maxlength="20"
          placeholder="Who paid"
          type="text"
          :class="inputClasses"
          v-model="name"
			 class="w-72"
        />
      </div>
    </div>
    <div class="flex justify-between gap-4">
      <div>
        <input
          maxlength="100"
          placeholder="Notes"
          type="text"
          :class="inputClasses"
          class="w-62"
          v-model="notes"
        />
      </div>
      <div class="flex gap-4">
        <button
          :class="buttonClasses"
          @click="addCalcInfo()"
          :disabled="disabled"
        >
          <span :class="{
				'text-red-500 duration-1000': disabled
			 }">Confirm</span>
        </button>
        <button :class="buttonClasses" @click="emits('hideCalcInfo')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>
