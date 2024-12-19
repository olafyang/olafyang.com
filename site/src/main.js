import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createHead, VueHeadMixin } from "@unhead/vue";

const app = createApp(App);
app.use(router);

const head = createHead();
app.mixin(VueHeadMixin);

app.use(head);
app.mount("#app");
