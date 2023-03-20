import { defineStore } from "pinia"

export const useCurrencyStore = defineStore('currency', {
  state: () => ({ lastCurrencies: [] }),
  getters: {
    lastThreeCurrencies: (state) => state.lastCurrencies
  },
  actions: {
    setCurrencies(currency) {
      if(this.lastCurrencies.length < 3){
        this.lastCurrencies.unshift(currency)
      }
      else{
        this.lastCurrencies.unshift(currency)
        this.lastCurrencies.pop()
      }
    },
  },
})
