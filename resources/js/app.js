import "./bootstrap";
import "../css/app.css";
import "vue-select/dist/vue-select.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "primeicons/primeicons.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import VueSelect from "vue-select";
import VueDatePicker from "@vuepic/vue-datepicker";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import FullCalendar from "@fullcalendar/vue3";
import VueECharts from "vue-echarts";

const pinia = createPinia();

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(pinia)
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: {
                    preset: Aura,
                },
                options: {
                    prefix: "p",
                    darkModeSelector: "system",
                    cssLayer: false,
                },
            })
            .component("v-select", VueSelect)
            .component("VueDatePicker", VueDatePicker)
            .component("FullCalendar", FullCalendar)
            .component("v-chart", VueECharts)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});
