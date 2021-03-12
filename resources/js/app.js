import "./bootstrap";

import { createApp, provide, h } from "vue";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { DefaultApolloClient } from "@vue/apollo-composable";
import Toaster from "@meforma/vue-toaster";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

import Board from "./Board";

const defaultClient = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql",
  cache: new InMemoryCache(),
});

createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient);
  },
  render() {
    return h(Board);
  },
})
  .component("scale-loader", ScaleLoader)
  .use(Toaster)
  .mount("#app");
