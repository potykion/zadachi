import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import {fitTextArea} from "./utils";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");


Vue.directive(
    "focus", {
        inserted: function (el) {
            fitTextArea(el);
            el.focus();
        }
    }
);
