import LoginPage from "./pages/LoginPage.vue"
import ExchangePage from "./pages/ExchangePage.vue"                                     
import HistoryPage from "./pages/HistoryPage.vue"                                     
import * as VueRouter from "vue-router";

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/', component: ExchangePage },
  { path: '/history', component: HistoryPage },
  { path:"/:pathMatch(.*)*" , redirect:"/"}
]

export default  VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, 
})