

import Vue from "vue";
import VueRouter from 'vue-router';

import App from "./App.vue";
import Sing from "./components/Sing.vue";
import Item from "./components/Item.vue";
import Login from "./components/Login.vue";
import Show from "./components/Show.vue";
import Man from "./components/Man.vue";
import Girl from "./components/Girl.vue";
import Child from "./components/Child.vue";
import Detail from "./components/Detail.vue";
import Buy from "./components/Buy.vue";
import Pay from "./components/Pay.vue";
import Image from "./components/Image.vue";
import File from "./components/SingleFile.vue";
import Sell from "./components/Sell.vue";
import Admin from "./components/Item.vue";
import My from "./components/My.vue";


Vue.use(VueRouter);

const routes = [
  {
    name: "Sell",
    path: "/Sell",
    component: Sell
  },
  {
    name: "My",
    path: "/My",
    component: My
  },
  {
    name: "Admin",
    path: "/Admin",
    component: Admin
  },
  {
    name: "File",
    path: "/File",
    component: File
  },

  
  {
    name: "Sing",
    path: "/Sing",
    component: Sing
  },
  {
    name: "Image",
    path: "/Image",
    component: Image
  },
  {
    name: "Item",
    path: "/Item",
    component: Item
  },
  {
    name: "Login",
    path: "/Login",
    component: Login
  },
  {
    name: "Show",
    path: "/Show",
    component: Show
  },
  {
    name: "Man",
    path: "/Man",
    component: Man
  },
  {
    name: "Girl",
    path: "/Girl",
    component: Girl
  },
  {
    name: "Child",
    path: "/Child",
    component: Child
  },
  {
    name: "Detail",
    path:  "/Detail/:item",
    component: Detail
  },
  {
    name: "Buy",
    path:  "/Buy/:item",
    component: Buy
  },
  {
    name: "Pay",
    path:  "/Pay/:item",
    component: Pay
  },
 
 
];

const router = new VueRouter({ mode: "history", routes: routes });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");