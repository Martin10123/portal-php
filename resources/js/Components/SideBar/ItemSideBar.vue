<template>
    <button type="button" @click="onOpenSubItems"
        class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">

        <img class="w-8 h-8 object-cover" :src="icon" :alt="title">

        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ title }}</span>

        <svg v-if="hasSubItems" class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
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
</template>

<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';

defineProps({
    icon: String,
    hasSubItems: Boolean,
    subItems: Array,
    title: String,
    isOpen: Boolean
});

const openSubItems = ref(false);

const onOpenSubItems = () => {
    openSubItems.value = !openSubItems.value;
};
</script>