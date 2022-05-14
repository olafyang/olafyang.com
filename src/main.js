import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createMetaManager, defaultConfig, deepestResolver, plugin as vueMetaPlugin } from "vue-meta";

const app = createApp(App);
app.use(router);

const manager = createMetaManager(false, defaultConfig, deepestResolver)
app.use(manager);
app.use(vueMetaPlugin);
app.mount("#app");
