<template>
  <main class="flex items-center justify-center">
    <v-sheet class="w-3/5 rounded-xl" elevation="10">
      <div class="grid md:grid-cols-2 sm:grid-cols-1">
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
          >
            <div>
              <v-text-field
                v-model="userName"
                :rules="[(v) => !!v || 'Username is required']"
                class="rounded-xl mb-5"
                label="Username"
                id="username"
                color="primary"
                prepend-inner-icon="mdi-person"
              ></v-text-field>
              <v-text-field
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
    <v-snackbar v-model="snackBar" color="red" :timeout="2000">
      Username or password is incorect!!!
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackBar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </main>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { USER } from "@/constants";
import { setLocalStorageByKey } from "@/helpers";
// #region states
const userName = ref("");
const password = ref("");
const snackBar = ref(false);
const loading = ref(false);
const showPassword = ref(false);
// #endregion

// #region methods
const loginUser = () => {
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
};
// #endregion
</script>
