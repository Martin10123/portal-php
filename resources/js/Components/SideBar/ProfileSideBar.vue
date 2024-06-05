<template>
    <div class="flex items-center gap-5 p-2 shadow-md rounded-lg relative">

        <ul :class="{
            'absolute bg-white w-11/12 bottom-28 left-1/2 transform rounded-lg -translate-x-1/2 shadow-lg': true, 'hidden': !openProfile,
            'md:w-96 md:fixed md:left-72': !openMenu
        }">
            <li class="p-3 border-b cursor-pointer">Ver perfil</li>
            <li class="p-3 border-b cursor-pointer">Configuraciones</li>
            <li class="p-3 border-b cursor-pointer" @click="logout">Cerrar sesión</li>
        </ul>

        <img :src="userActive.photo" class="w-14 h-auto rounded-full py-3 cursor-pointer" alt="Avatar del usuario"
            @click="onOpenProfile">

        <div>
            <p>
                <strong>{{ userActive.name }}</strong>
            </p>
            <div class="grid gap-1">
                <p class="text-xs text-gray-600 flex items-center gap-2">
                    <i class="fa-solid fa-user-tie"></i>
                    {{ userActive.cargo }} - {{ userActive.gerencia }}
                </p>
                <p class="text-xs text-gray-600 flex items-center gap-2 cursor-pointer" @click="onCopyEmail">
                    <i class="fa-solid fa-at"></i>
                    {{ userActive.username }}@cotecmar.com
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed, ref } from 'vue';
import { router, usePage } from '@inertiajs/vue3';

const { props } = usePage();

const userActive = computed(() => props.auth.user);

console.log(userActive.value);

const { openMenu } = defineProps({
    openMenu: Boolean
})

const openProfile = ref(false);

const onOpenProfile = () => {
    openProfile.value = !openProfile.value;
};

const onCopyEmail = () => {
    navigator.clipboard.writeText(userActive.value.usuario);
    alert("Correo copiado al portapapeles");
}

const logout = () => {
    router.post(route('logout'));
}
</script>