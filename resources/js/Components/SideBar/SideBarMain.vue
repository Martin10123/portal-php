<template>
    <nav
        :class="{ 'bg-white shadow-md flex flex-col md:w-2/4 md:duration-300 sticky top-0 z-50': true, 'md:w-96 lg:w-96 md:duration-300': true }">
        <div
            :class="{ 'w-full flex items-center justify-between bg-white shadow-md p-2': true, 'md:flex-col': !openMenu }">
            <LogoCotecmar />
            <button @click="onOpenMenu" class="md:invisible">
                <i class="fa-solid fa-bars text-3xl"></i>
            </button>
        </div>

        <div :class="{
            'w-full h-screen-calc-6 mt-24 overflow-auto flex flex-col justify-between bg-white md:mt-0': true, 'absolute -top-1000': !openMenu, 'fixed md:relative top-0 ': openMenu, 'md:relative md:top-0 md:h-screen-calc-8': !openMenu
        }">

            <MenuItemsSideBar :open-menu="openMenu" />

            <ProfileSideBar :open-menu="openMenu" />

        </div>
    </nav>
</template>

<script setup>
import LogoCotecmar from '@/Assets/LogoCotecmar.vue';
import { ref } from 'vue';
import ProfileSideBar from './ProfileSideBar.vue';
import MenuItemsSideBar from './MenuItemsSideBar.vue';

const openMenu = ref(false);

const onOpenMenu = () => {
    openMenu.value = !openMenu.value;
};

</script>