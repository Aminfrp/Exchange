<template>
  <header-component v-if="isShowHeader"></header-component>
  <router-view></router-view>
</template>

<script setup>
import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
import { getLocalStorageByKey } from "@/helpers";
import router from "@/router";
import { ref } from "vue";

const isShowHeader = ref(false);

router.beforeEach((to, from, next) => {
  const isLogin = getLocalStorageByKey("isLogin");
  isShowHeader.value = isLogin;
  if (to.path !== "/login" && !isLogin) next({ path: "/login" });
  else if (to.path === "/login" && isLogin) next({ path: "/" });
  else next();
});
</script>

<style></style>
