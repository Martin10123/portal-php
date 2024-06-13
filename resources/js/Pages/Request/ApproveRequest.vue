<template>

    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="flex">

        <SideBarMain :openSidebar="openSidebar" :toggleOpenSidebar="toggleOpenSidebar" />

        <h1>Aprobar solicitud</h1>

    </main>
</template>

<script setup lang="ts">
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useNavSidebar } from '@/Composables';

const { openSidebar, toggleOpenSidebar } = useNavSidebar()

</script>