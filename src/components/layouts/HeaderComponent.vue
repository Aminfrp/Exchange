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
  <div class="flex gap-5 p-5 pb-0">
    <router-link
      to="/"
      class="p-2"
      active-class="bg-[#583896] rounded text-white"
      >Home</router-link
    >
    <router-link
      class="p-2"
      to="/history"
      active-class="bg-[#583896] rounded text-white"
      >History</router-link
    >
  </div>
</template>
<script setup>
import { removeLocalStorageByKey } from "@/helpers";
import router from "@/router";
import { COLORS } from "@/constants";
import { useCurrencyStore } from "@/store";

const { resetCurrencies } = useCurrencyStore();
const userLogout = () => {
  removeLocalStorageByKey("isLogin");
  resetCurrencies();
  router.replace({ path: "/login", replace: true });
};
</script>
