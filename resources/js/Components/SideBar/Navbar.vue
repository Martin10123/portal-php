<template>
    <nav class="sticky top-0 z-30 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start rtl:justify-end">
                    <button type="button" @click="toggleOpenSidebar"
                        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                            </path>
                        </svg>
                    </button>
                    <Link href="/Sigedin" class="flex ms-2 md:me-24">
                    <LogoCotecmar />
                    <span
                        class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Cotecmar</span>
                    </Link>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center ms-3 relative">
                        <div>
                            <button type="button" @click="toggleProfile"
                                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                <span class="sr-only">Open user menu</span>
                                <img class="w-8 h-8 rounded-full object-cover" :src="userActive.photo"
                                    alt="user photo" />
                            </button>
                        </div>
                        <div
                            :class="['w-max z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-8', openProfile ? '' : 'hidden']">
                            <div class="px-4 py-3" role="none">
                                <p class="text-sm font-semibold text-gray-900 dark:text-white" role="none">
                                    {{ userActive.name }}
                                </p>
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                    {{ userActive.username }}@cotecmar.com
                                    <br>
                                    {{ userActive.cargo }} - {{ userActive.gerencia }}
                                </p>
                            </div>
                            <ul class="py-1" role="none">
                                <li @click="goToProfile"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                                    Perfil
                                </li>
                                <li
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                                    Configuraciones
                                </li>
                                <li class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                    role="menuitem" @click="logout">
                                    Salir
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

</template>

<script setup>
import LogoCotecmar from '@/Assets/LogoCotecmar.vue';
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { ref } from 'vue';

defineProps({
    toggleOpenSidebar: Function
})

const { props } = usePage();

const userActive = computed(() => props.auth.user);

const logout = () => {
    router.post(route('logout'));
}

const goToProfile = () => {
    router.get(route('Profile'));
}

const openProfile = ref(false);

const toggleProfile = () => {
    openProfile.value = !openProfile.value;
}

</script>