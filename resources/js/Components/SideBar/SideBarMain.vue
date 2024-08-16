<template>
    <aside
        class="fixed sm:sticky sm:h-screen-calc-4 top-0 sm:top-401 left-0 z-40 w-64 lg:w-96 h-screen transition-transform -translate-x-full sm:translate-x-0"
        :class="[openSidebar ? 'translate-x-0' : '', className]">

        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li v-for="{ icon, hasSubItems, subItems, title, isOnlyAdmin } in optionsItemSidebar" :key="title">
                    <ItemSideBar :icon="icon" :hasSubItems="hasSubItems" :subItems="subItems" :title="title" :isOnlyAdmin="isOnlyAdmin" />
                </li>
            </ul>
        </div>
    </aside>

    <div class="fixed inset-0 bg-black bg-opacity-50 z-30" v-show="openSidebar" @click="toggleOpenSidebar"></div>

</template>

<script setup>

import { optionsItemSidebar } from "../../Data/optionsSideBar"
import ItemSideBar from "./ItemSideBar.vue"; 

defineProps({
    openSidebar: Boolean,
    toggleOpenSidebar: Function,
    className: String
});

</script>