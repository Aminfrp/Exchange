import LoginPage from "./pages/LoginPage.vue"
import ExchangePage from "./pages/ExchangePage.vue"
import * as VueRouter from "vue-router";

const routes = [
  { path: '/', component: ExchangePage },
  { path: '/login', component: LoginPage },
  { path:"/:pathMatch(.*)*" , redirect:"/"}
]

export default  VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, 
})