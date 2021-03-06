import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/initialRem";
import "vant/lib/index.css";

const app = createApp(App).use(store).use(router);
app.mount("#app");
