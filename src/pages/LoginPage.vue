<template>
  <main class="flex items-center justify-center">
    <v-sheet class="w-3/5 rounded-xl" elevation="10">
      <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <!-- login image -->
        <section class="flex items-center justify-center">
          <img
            src="../assets/images/login.png"
            alt="Login Image"
            style="height: 80%"
          />
        </section>
        <!-- login form -->
        <section class="flex justify-center flex-column p-10">
          <v-form
            class="flex flex-column justify-between h-full"
            @submit.prevent="loginUser"
            validate-on="submit"
            ref="form"
          >
            <div>
              <v-text-field
                v-model="userName"
                :rules="[(v) => !!v || 'Username is required']"
                class="rounded-xl mb-5"
                label="Username"
                id="username"
                color="primary"
                prepend-inner-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                prepend-inner-icon="mdi-lock"
                v-model="password"
                class="rounded-xl mb-5"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                :rules="[
                  () => !!password || 'Password is required',
                  () =>
                    (!!password && password.length >= 8) ||
                    'Password must more than 8 char',
                ]"
                id="password"
                label="Password"
                color="primary"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </div>
            <div>
              <v-btn
                type="submit"
                block
                prepend-icon="mdi-login"
                :loading="loading"
                class="mt-2 slef-end"
                color="primary"
                :disabled="!userName || !password"
                >LOGIN</v-btn
              >
            </div>
          </v-form>
        </section>
      </div>
    </v-sheet>
    <snackbar-component
      message="Username or password is incorect!!!"
      :isShow="snackBar"
      @close="snackBar = false"
    />
  </main>
</template>

<script setup>
import router from "@/router";
import SnackbarComponent from "@/components/common/SnackbarComponent.vue";
import { ref } from "vue";
import { USER } from "@/constants";
import { setLocalStorageByKey } from "@/helpers";
// #region states
const userName = ref("");
const password = ref("");
const snackBar = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const form = ref(null);

// #endregion

// #region methods
const loginUser = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    if (userName.value === USER.username && password.value === USER.password) {
      loading.value = true;
      // fetch api simulator for loading
      setTimeout(() => {
        setLocalStorageByKey("isLogin", true);
        router.replace({ path: "/", replace: true });
        loading.value = false;
      }, 2000);
    } else {
      snackBar.value = true;
      loading.value = false;
    }
  }
};
// #endregion
</script>
