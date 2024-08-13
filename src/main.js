import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/style.css";
import "@/assets/main.css";

// 캘린더 영역
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Use plugin defaults (optional)
app.use(setupCalendar, {});

// Use the components
app.component("VCalendar", Calendar);
app.component("VDatePicker", DatePicker);

app.mount("#app");
