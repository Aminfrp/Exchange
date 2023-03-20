import axios from 'axios';

const currencyAxios = axios.create({
  baseURL:process.env.VUE_APP_URL,
})


export default {
  currencyList : (from,to)=> {
    const params = new URLSearchParams()
    params.append("function","FX_DAILY")
    params.append("apikey","UMXBJNVO5C8K2VZB")
    params.append("to_symbol",to)
    params.append("from_symbol",from)
    return currencyAxios.get("/query",{params});
  }
}