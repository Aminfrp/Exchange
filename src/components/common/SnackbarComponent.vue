<template>
  <v-snackbar v-model="isShow" color="red" :timeout="2000">
    {{ message }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="$emit('close')">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup>
import { toRefs } from "vue";

// #region props and emits
const props = defineProps({
  message: String,
  isShow: Boolean,
});
const { message, isShow } = toRefs(props);
// #endregion
</script>
