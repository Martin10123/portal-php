<template>

    <Head :title="title" />

    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-[0fr,1fr]">

        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <slot />

    </main>

</template>

<script setup>
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useNavSidebar } from '@/Composables';
import { Head } from '@inertiajs/vue3';

const { openSidebar, toggleOpenSidebar } = useNavSidebar();

defineProps({
    title: String
})

</script>