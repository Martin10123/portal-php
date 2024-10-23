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
import { useSidebarStore } from "@/pinia/useSidebarStore";
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
const sidebarStore = useSidebarStore();
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

const listOptions = computed(() => sidebarStore.listOptions);

onMounted(async () => {
    await sidebarStore.fetchUsersPrivileges();
    await sidebarStore.fetchFloors(storeCalendar);
    sidebarStore.generateOptions();
});

</script>