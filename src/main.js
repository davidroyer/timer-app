import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "./registerServiceWorker";
// const Store = require('electron-store');

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
