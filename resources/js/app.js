import "./bootstrap";

import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import Toaster from "@meforma/vue-toaster";

import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import App from "./App.vue";
import { IconButton } from "./components";

import { apollo } from "./configs";

createApp({
  setup() {
    provide(DefaultApolloClient, apollo.client);
  },
  render() {
    return h(App);
  },
})
  .component("scale-loader", ScaleLoader)
  .component("pulse-loader", PulseLoader)
  .component("icon-button", IconButton)
  .use(Toaster)
  .mount("#app");
