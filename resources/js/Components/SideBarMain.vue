<template>
    <nav
        :class="{ 'bg-white shadow-md flex flex-col md:w-2/4 md:duration-300 sticky top-0 z-50': true, 'md:w-24 lg:w-24 md:duration-300': !openMenu, 'lg:w-96': openMenu }">
        <div
            :class="{ 'w-full flex items-center justify-between bg-white shadow-md p-2': true, 'md:flex-col': !openMenu }">
            <LogoCotecmar />
            <button @click="onOpenMenu">
                <i class="fa-solid fa-bars text-3xl"></i>
            </button>
        </div>

        <div :class="{
            'w-full h-screen-calc-6 md:h-screen-calc-8 mt-24 overflow-auto flex flex-col justify-between bg-white md:mt-0': true, 'absolute -top-1000 duration-700': !openMenu, 'fixed md:relative top-0 duration-700': openMenu, 'md:relative md:top-0': !openMenu
        }">
            <ul class="px-3 pt-4 grid gap-3 relative">
                <li :class="{ 'text-lg border-b-2 p-3 py-4 shadow-md rounded-lg cursor-pointer hover:bg-slate-100 transition duration-150 ease-in-out scale-100 relative': true, }"
                    v-for="{ title, hasSubItems, other, icon } in optionsItem">
                    <span :class="{ 'flex justify-between items-center': true, 'md:justify-center': !openMenu }"
                        @click="onOpenItems">
                        <span class="flex items-center gap-4">
                            <i :class="icon"></i>
                            <span :class="{ 'md:hidden': !openMenu }">
                                {{ title }}
                            </span>
                        </span>

                        <template v-if="hasSubItems">
                            <i :class="{ 'fa-solid fa-arrow-down': true, 'md:hidden': !openMenu }"></i>
                        </template>
                    </span>

                    <ul v-if="hasSubItems" :class="{
                        'pl-10 pt-3': true, 'transition duration-150 ease-in-out': true, 'hidden': !openItems,
                        '': !openMenu
                    }">
                        <li class="py-3 border-b" v-for="{ title, goTo } in other">
                            <Link :href="goTo">
                            {{ title }}
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>

            <div class="flex items-center gap-5 p-2 shadow-md rounded-lg relative">

                <ul :class="{
                    'absolute bg-white w-11/12 bottom-28 left-1/2 transform rounded-lg -translate-x-1/2 shadow-lg': true, 'hidden': !openProfile,
                    'md:w-96 md:fixed md:left-72': !openMenu
                }">
                    <li class="p-3 border-b cursor-pointer">Ver perfil</li>
                    <li class="p-3 border-b cursor-pointer">Configuraciones</li>
                    <li class="p-3 border-b cursor-pointer">Cerrar sesión</li>
                </ul>

                <img src="../Assets/avatar.png" class="w-20 h-auto rounded-full py-3 cursor-pointer"
                    alt="Avatar del usuario" @click="onOpenProfile">

                <div :class="{ 'md:hidden': !openMenu }">
                    <p>
                        <strong>Martin Elias Simarra Salgado</strong>
                    </p>
                    <div class="grid gap-1">
                        <p class="text-xs text-gray-600 flex items-center gap-2">
                            <i class="fa-solid fa-user-tie"></i>
                            Aprendiz - GEDIN
                        </p>
                        <p class="text-xs text-gray-600 flex items-center gap-2 cursor-pointer" @click="onCopyEmail">
                            <i class="fa-solid fa-at"></i>
                            msimarra@cotecmar.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import LogoCotecmar from '@/Assets/LogoCotecmar.vue';
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';

const openItems = ref(false);
const openMenu = ref(false);
const openProfile = ref(false);

const onOpenItems = () => {
    openItems.value = !openItems.value;

    openMenu.value = true;
};

const onOpenMenu = () => {
    openMenu.value = !openMenu.value;

    openItems.value = false;
};

const onOpenProfile = () => {
    openProfile.value = !openProfile.value;
};

const onCopyEmail = () => {
    navigator.clipboard.writeText("msimarra@cotecmar.com");
    alert("Correo copiado al portapapeles");
}

const optionsItem = [
    {
        title: "Solicitudes",
        hasSubItems: true,
        icon: "fa-solid fa-list",
        other: [
            { title: "Agregar solicitud", goTo: "/Sigedin/Request/AddRequest" },
            { title: "Aprobar solicitud", goTo: "/Sigedin/Request/ApproveRequest" },
        ]
    },
];

</script>