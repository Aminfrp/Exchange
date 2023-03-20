v-container
<template>
  <main class="relative">
    <!-- search currency section -->
    <section
      :class="`w-full search-field ${
        currencyList && Object.keys(currencyList).length ? 'with-chart' : ''
      }`"
    >
      <search-component
        @search="searchCurrency"
        @resetData="resetData"
        :loading="searchLoading"
        @updateTo="(value) => (toSymbol = value)"
        @updateFrom="(value) => (fromSymbol = value)"
      />
    </section>
    <!-- Daily chart section -->
    <section
      v-if="currencyList && Object.keys(currencyList).length"
      class="absolute sm:top-[50%] md:top-[28%] lg:top-[25%] w-full chart-section"
    >
      <v-container>
        <vue-apex-charts
          type="line"
          :options="options"
          :series="series"
          height="500"
        />
      </v-container>
    </section>
    <snackbar-component
      :message="errorMessage"
      :isShow="snackBar"
      @close="snackBar = false"
    />
  </main>
</template>
<script setup>
import SearchComponent from "@/components/specific/SearchComponent.vue";
import SnackbarComponent from "@/components/common/SnackbarComponent.vue";
import currencyAxios from "@/apis";
import VueApexCharts from "vue3-apexcharts";
import { computed, ref, toRaw, watch } from "vue";
import { useCurrencyStore } from "@/store";

// #region store
const store = useCurrencyStore();
// #endregion

// #region states
const currencyList = ref({});
const currencyInfo = ref({});
const options = ref({});
const series = ref([]);
const searchLoading = ref(false);
const errorMessage = ref("");
const snackBar = ref(false);
const fromSymbol = ref("");
const toSymbol = ref("");
// #endregion
// #region computed
const info = computed({
  get() {
    return (
      toRaw(currencyInfo.value["2. From Symbol"]) +
      " to " +
      toRaw(currencyInfo.value["3. To Symbol"])
    );
  },
});
// #endregion
// #region methods
const searchCurrency = async () => {
  searchLoading.value = true;
  try {
    const data = await currencyAxios
      .currencyList(fromSymbol.value, toSymbol.value)
      .finally(() => {
        searchLoading.value = false;
        resetData();
      });
    if ("Error Message" in data.data) {
      errorMessage.value = data.data["Error Message"];
      snackBar.value = true;
    } else if ("Note" in data.data) {
      errorMessage.value = data.data["Note"];
      snackBar.value = true;
    } else {
      currencyList.value = data.data["Time Series FX (Daily)"];
      currencyInfo.value = data.data["Meta Data"];
      store.setCurrencies({
        data: data.data["Time Series FX (Daily)"],
        series,
        options,
      });
    }
  } catch (err) {
    searchLoading.value = false;
  }
};

const resetData = () => {
  currencyList.value = [];
  fromSymbol.value = "";
  toSymbol.value = "";
};
// #endregion
// watch searched data for chart
watch(currencyList, (currencies, _) => {
  if (currencies) {
    options.value = {
      chart: {
        type: "line",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      title: {
        text: info.value,
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        type: "datetime",
        categories: Object.keys(currencies),
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };

    const open = { name: "open", data: [] };
    const high = { name: "high", data: [] };
    const low = { name: "low", data: [] };
    const close = { name: "close", data: [] };
    Object.values(currencies).forEach((currency) => {
      open.data.push(toRaw(currency)["1. open"]);
      high.data.push(toRaw(currency)["2. high"]);
      low.data.push(toRaw(currency)["3. low"]);
      close.data.push(toRaw(currency)["4. close"]);
    });

    series.value = [open, high, low, close];
  }
});
</script>

<style scoped>
.search-field {
  position: absolute;
  top: 30%;
  transition: all 1s ease;
}
.with-chart {
  top: 5%;
}
.chart-section {
  transition: all 1s ease 2s;
}
</style>
