<template>
    <aside
        :class="['fixed bottom-0 left-0 z-40 md:z-20 w-64 sm:sticky sm:h-screen-calc-4 transition-transform -translate-x-full sm:translate-x-0', openSidebar ? 'top-0 h-screen transform-none z-50' : '']"
        aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li v-for="{ title, hasSubItems, subItems } in optionsItemSidebar">
                    <button type="button"
                        class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" @click="onOpenMenu">
                        <svg class="w-[28px] h-[28px] text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.3"
                                d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z" />
                        </svg>
                        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ title }}</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <ul v-show="hasSubItems" :class="['py-2 space-y-2', openMenu ? '' : 'hidden']">
                        <li v-for="item in subItems">
                            <Link :href="item.goTo"
                                class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                            {{ item.title }}
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </aside>

</template>

<script setup>

import { optionsItemSidebar } from '@/Data/optionsSideBar';
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const openMenu = ref(false);
const openSidebar = ref(false);

const onOpenMenu = () => {
    openMenu.value = !openMenu.value;
};

const onOpenSidebar = () => {
    openSidebar.value = !openSidebar.value;
};

</script>