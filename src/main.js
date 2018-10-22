import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import clingo from "@/scripts/clingo";
Window.clingo = new clingo();

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
