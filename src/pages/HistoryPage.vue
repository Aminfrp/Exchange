<template>
  <main>
    <template v-if="lastThreeCurrencies.length">
      <v-container
        v-for="(currency, index) in lastThreeCurrencies"
        :key="index"
      >
        <vue-apex-charts
          type="line"
          :options="currency.options"
          :series="currency.series"
          height="500"
        />
      </v-container>
    </template>
    <div class="flex justify-center items-center" v-else>
      <img src="../assets/images/404.webp" alt="not found image" />
    </div>
  </main>
</template>

<script setup>
import { useCurrencyStore } from "@/store";
import VueApexCharts from "vue3-apexcharts";
// #region store
const store = useCurrencyStore();
const { lastThreeCurrencies } = store;
// #endregion
</script>
