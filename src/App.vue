<template>
  <router-view></router-view>
</template>

<script setup>
import { getLocalStorageByKey } from "./helpers";
import router from "./router";

router.beforeEach((to, from, next) => {
  const isLogin = getLocalStorageByKey("isLogin");
  if (to.path !== "/login" && !isLogin) next({ path: "/login" });
  else if (to.path === "/login" && isLogin) next({ path: "/" });
  else next();
});
</script>

<style></style>
