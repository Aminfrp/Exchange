<template>
  <v-form
    @submit.prevent="search"
    ref="form"
    @reset.prevent="reset"
    validate-on="submit"
    class="shadow-lg mx-5 border rounded-lg"
  >
    <h1 class="px-5 py-2 font-weight-bold">Select your currencies</h1>
    <div
      class="grid md:grid-cols-9 lg:grid-cols-12 sm:grid-cols-1 pt-5 px-5 pb-2 gap-x-5 m-0"
    >
      <v-autocomplete
        label="From currency"
        :items="DUMMY_DATA"
        item-title="description"
        item-value="symbol"
        class="lg:col-span-5 md:col-span-3 sm:col-span-1"
        :rules="[(v) => !!v || 'From currency is required']"
        color="primary"
        placeholder="Please select your from currency"
        @update:modelValue="updateFrom($event)"
      ></v-autocomplete>
      <v-autocomplete
        label="To currency"
        color="primary"
        class="lg:col-span-5 md:col-span-3 sm:col-span-1"
        placeholder="Please select your currency you want converted"
        :rules="[(v) => !!v || 'To currency is required']"
        :items="DUMMY_DATA"
        item-title="description"
        item-value="symbol"
        @update:modelValue="updateTo($event)"
      ></v-autocomplete>
      <div
        class="flex justify-center gap-5 sm:py-5 lg:py-0 md:py-0 sm:col-span-1 md:col-span-3 lg:col-span-2"
      >
        <v-btn
          icon="mdi-magnify"
          class="text-white"
          type="sumbit"
          :color="COLORS.secondary"
          :loading="loading"
        />
        <v-btn
          icon="mdi-refresh"
          variant="outlined"
          :color="COLORS.secondary"
          type="reset"
        />
      </div>
    </div>
  </v-form>
</template>
<script setup>
import { COLORS, DUMMY_DATA } from "@/constants";
import { ref, toRefs } from "vue";
const form = ref(null);
// #region props and emits
const props = defineProps({
  loading: Boolean,
  fromSymbol: String,
  toSymbol: String,
  modelValue: Object,
});
const { loading } = toRefs(props);
const emit = defineEmits(["resetData", "updateFrom", "updateTo", "search"]);

function updateFrom(value) {
  emit("updateFrom", value);
}
function updateTo(value) {
  emit("updateTo", value);
}

const reset = () => {
  emit("resetData");
};

const search = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    emit("search");
    form.value.reset();
  }
};
// #endregion
</script>

<style scoped>
.border-color {
  border-color: #583896 !important;
}
</style>
