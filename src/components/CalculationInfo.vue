<script setup>
const MAX_NAME_LENGTH = 20;
const MAX_NOTES_LENGTH = 30;

import { ref, watch, onMounted } from "vue";

import Datepicker from "vue3-datepicker";

const emits = defineEmits({
  hideCalcInfo: {
    required: false,
  },
  addUserInfo: {
    type: Object,
    required: true,
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

  emits("addUserInfo", { paid: userName, notes: userNotes, date: userDate });
  resetFields();
}

function changeButtonState() {
  let userName = name.value;
  let userNotes = notes.value;

  disabled.value = false;

  userName.split("").forEach((el) => {
    if (!/^[A-Za-z\s]+$/.test(el) && !/^[А-Яа-яҐґЄєІіЇї\s]+$/.test(el)) {
      disabled.value = true;
    }
  });

  if (!userName || userName.split("").length < 2) disabled.value = true;
  if (!userNotes) disabled.value = true;
}

function resetFields() {
  name.value = "";
  notes.value = "";
  date.value = new Date();
  emits("hideCalcInfo");
}

watch(
  () => name.value,
  () => changeButtonState()
);

watch(
  () => notes.value,
  () => changeButtonState()
);

onMounted(() => {
  changeButtonState();
});

const inputClasses =
  "bg-slate-100 h-14 rounded-md pl-2 text-xl hover:bg-slate-300 duration-500";
const datepickerClasses =
  "pl-3 text-xl bg-slate-100 h-14 py-4 w-48 rounded-md cursor-pointer hover:bg-slate-300 duration-500 sssm:w-36";
const buttonClasses =
  "bg-slate-100 h-14 rounded-md text-xl hover:bg-slate-300 duration-500";
</script>

<template>
  <div class="flex flex-col gap-4 font-semibold">
    <div class="flex justify-between mt-3">
      <Datepicker v-model="date" :class="datepickerClasses"></Datepicker>
      <div class="text-right">
        <input
          :maxlength="MAX_NAME_LENGTH"
          placeholder="Who paid"
          type="text"
          :class="inputClasses"
          v-model="name"
          class="w-full ssm:w-56 sssm:w-52 ssssm:w-44"
        />
      </div>
    </div>
    <div class="flex justify-between gap-4">
      <div>
        <input
          :maxlength="MAX_NOTES_LENGTH"
          placeholder="Notes"
          type="text"
          :class="inputClasses"
          class="w-11/12 ssm:w-48 sssm:w-36"
          v-model="notes"
        />
      </div>
      <div class="flex gap-8 sssm:gap-4 ssssm:gap-3">
        <button
          class="w-24 ssssm:w-full ssssm:p-2"
          :class="buttonClasses"
          @click="addCalcInfo()"
          :disabled="disabled"
        >
          <span
            class="duration-1000"
            :class="{
              'text-red-500': disabled,
            }"
            >Confirm</span
          >
        </button>
        <button
          class="w-24 ssssm:w-full ssssm:p-2"
          :class="buttonClasses"
          @click="emits('hideCalcInfo')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
