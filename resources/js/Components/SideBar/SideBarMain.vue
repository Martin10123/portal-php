<template>
    <aside :class="['fixed sm:sticky sm:h-screen-calc-4 top-0 sm:top-401 left-0 z-40 w-64 lg:w-96 h-screen transition-transform -translate-x-full sm:translate-x-0',
        openSidebar ? 'translate-x-0' : '']">

        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li v-for="{ icon, hasSubItems, subItems, title } in optionsItemSidebar">
                    <button type="button" @click="onOpenSubItems"
                        class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">

                        <component :is="icon" />

                        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ title }}</span>

                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <ul v-show="hasSubItems" :class="openSubItems ? 'py-2 space-y-2' : 'hidden'">
                        <li v-for="{ goTo, title } in subItems">
                            <Link :href="goTo"
                                class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            {{ title }}</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </aside>

    <div class="fixed inset-0 bg-black bg-opacity-50 z-30" v-show="openSidebar" @click="toggleOpenSidebar"></div>

</template>

<script setup>

import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import { optionsItemSidebar } from "../../Data/optionsSideBar"

defineProps({
    openSidebar: Boolean,
    toggleOpenSidebar: Function
});

const openSubItems = ref(false);

const onOpenSubItems = () => {
    openSubItems.value = !openSubItems.value;
};

</script>