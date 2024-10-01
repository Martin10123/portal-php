<template>
    <aside :class="[openSidebar ? 'translate-x-0' : '', className, classNameStyle.sidebar]">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <PanelMenu :model="listOptions">
                    <template #item="{ item }">
                        <div v-if="item.route">
                            <Link
                                class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
                                :href="item.route">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                            </Link>
                        </div>
                        <a v-else
                            class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
                            :href="item.url" :target="item.target">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                            <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
                        </a>
                    </template>
                </PanelMenu>
            </ul>
        </div>

        <div :class="[classNameStyle.toggleBtn]" @click="toggleOpenSidebarCom">
            <span :class="openSidebar ? 'pi pi-chevron-left' : 'pi pi-chevron-right'" />
        </div>
    </aside>
</template>

<script setup>
import { useDataCalendarStore } from "@/pinia/useDataCalendarStore";
import { Link } from "@inertiajs/vue3";
import PanelMenu from "primevue/panelmenu";
import { computed } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";

defineProps({
    openSidebar: Boolean,
    toggleOpenSidebar: Function,
    className: String,
});

const storeCalendar = useDataCalendarStore();
const listFloors = ref([]);
const listOptions = ref([]);
const listUsersPrivileges = ref([]);

const hiddenSidebar = ref(false);

const SIDEBAR_OPEN =
    "fixed sm:sticky sm:h-screen-calc-4 top-0 sm:top-401 left-0 z-40 w-64 lg:min-w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 duration-300";
const SIDEBAR_CLOSED =
    "relative lg:w-0 sm:w-0 h-screen-calc-4 left-[-6rem] duration-300 overflow-hidden";

const TOGGLE_BTN_OPEN =
    "fixed top-[50%] -right-5 -translate-y-1/2 bg-white rounded-[50%] w-10 h-10 flex items-center justify-center cursor-pointer shadow hover:bg-slate-100 z-[999] duration-300";
const TOGGLE_BTN_CLOSED =
    "fixed top-[50%] left-[-1rem] -translate-y-1/2 bg-white rounded-[50%] w-10 h-10 flex items-center justify-center cursor-pointer shadow hover:bg-slate-100 z-[999] duration-300";

const classNameStyle = computed(() => ({
    sidebar: hiddenSidebar.value ? SIDEBAR_CLOSED : SIDEBAR_OPEN,
    toggleBtn: hiddenSidebar.value ? TOGGLE_BTN_CLOSED : TOGGLE_BTN_OPEN,
}));

const toggleOpenSidebarCom = () => {
    hiddenSidebar.value = !hiddenSidebar.value;
};

const generateFloorOptions = (floors) => {
    return floors.map((floor) => ({
        label:
            floor.Sala_Name === "Laboratorio de Realidad Extendida"
                ? "Laboratorio XRLAB"
                : floor.Sala_Name,
        icon: "pi pi-list",
        route: `/Sigedin/CalendarPage/CalendarPage?floor=${floor.ID}`,
    }));
};

const fetchUsersPrivileges = async () => {
    try {
        const response = await axios.get(route("privilegios.index"));

        listUsersPrivileges.value = response.data.data;
    } catch (error) {
        console.error(error);
    }
};

const fetchSidebarOptions = async () => {
    await storeCalendar.getFloors();

    listFloors.value = generateFloorOptions(
        storeCalendar.allFloorsCalendar.data
    );

    const options = [
        {
            id: 0,
            label: "Solicitudes",
            icon: "pi pi-folder-plus",
            items: [
                {
                    label: "Agregar solicitud",
                    icon: "pi pi-file-plus",
                    route: "/Sigedin/Request/AddRequest",
                },
            ],
        },
        {
            id: 1,
            label: "Planillación",
            icon: "pi pi-file-check",
            items: [
                {
                    label: "Gestion de grafos",
                    icon: "pi pi-list-check",
                    route: "/Sigedin/Personnel/Reports",
                },
            ],
        },
        {
            id: 2,
            label: "Reservar sala",
            icon: "pi pi-bell",
            items: [
                ...listFloors.value,
                {
                    label: "Gestionar salas",
                    icon: "pi pi-clipboard",
                    route: "/Sigedin/CalendarPage/AdminFloor",
                },
            ],
        },
        {
            id: 3,
            label: "Graficos",
            icon: "pi pi-chart-bar",
            items: [
                {
                    label: "Index",
                    icon: "pi pi-chart-pie",
                    route: "/Sigedin/Charts/ChartsMain",
                },
            ],
        },
    ];

    listOptions.value = options.filter((option) => {

        if (listUsersPrivileges.value.length === 0) {
            if (option.id === 2) {
                return option.items.pop();
            }
            return
        }

        return listUsersPrivileges.value.some((privilege) => {
            if (privilege.Is_Visible === "1" && Number(privilege.Menu_Items_ID) === option.id) {
                return option;
            }
        });
    });
};

onMounted(() => {
    fetchUsersPrivileges();
    fetchSidebarOptions();
});

</script>