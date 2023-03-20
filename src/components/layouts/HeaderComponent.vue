<template>
  <v-toolbar class="primary" elevation="5" :color="COLORS.secondary">
    <!-- logout btn -->
    <v-btn @click="userLogout" class="text-white" prepend-icon="mdi-logout"
      >LOGOUT</v-btn
    >
    <!-- title -->
    <template v-slot:title>
      <h2 class="text-white">Exchange Application</h2>
    </template>
  </v-toolbar>
</template>
<script setup>
import { removeLocalStorageByKey } from "@/helpers";
import router from "@/router";
import { COLORS } from "@/constants";

const userLogout = () => {
  removeLocalStorageByKey("isLogin");
  router.replace({ path: "/login", replace: true });
};
</script>
