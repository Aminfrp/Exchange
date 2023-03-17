<template>
  <v-btn @click="userLogout">LOG OUT</v-btn>
</template>
<script setup>
import { removeLocalStorageByKey } from "@/helpers";
import router from "@/router";

const userLogout = () => {
  removeLocalStorageByKey("isLogin");
  router.replace({ path: "/login", replace: true });
};
</script>
