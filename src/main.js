import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  createMetaManager,
  defaultConfig,
  deepestResolver,
  plugin as vueMetaPlugin,
} from "vue-meta";

const app = createApp(App);
app.use(router);

const manager = createMetaManager(
  false,
  {
    ...defaultConfig,
    esi: {
      group: true,
      namespaced: true,
    },
    ...{
      "twitter:card": {
        tag: "meta",
        keyAttribute: "name",
        valueAttribute: "content",
      },
      "twitter:title": {
        tag: "meta",
        keyAttribute: "name",
        valueAttribute: "content",
      },
      "twitter:description": {
        tag: "meta",
        keyAttribute: "name",
        valueAttribute: "content",
      },
      "twitter:image": {
        tag: "meta",
        keyAttribute: "name",
        valueAttribute: "content",
      },
      "twitter:domain": {
        tag: "meta",
        keyAttribute: "property",
        valueAttribute: "content",
      },
      "twitter:url": {
        tag: "meta",
        keyAttribute: "property",
        valueAttribute: "content",
      },
      "og:url": {
        tag: "meta",
        keyAttribute: "property",
        valueAttribute: "content",
      },
      "og:type": {
        tag: "meta",
        keyAttribute: "property",
        valueAttribute: "content",
      },
      "og:description": {
        tag: "meta",
        keyAttribute: "property",
        valueAttribute: "content",
      },
      "og:title": {
        tag: "meta",
        keyAttribute: "property",
        valueAttribute: "content",
      },

      "og:image": {
        tag: "meta",
        keyAttribute: "property",
        valueAttribute: "content",
      },
    },
  },
  deepestResolver
);
app.use(manager);
app.use(vueMetaPlugin);
app.mount("#app");
