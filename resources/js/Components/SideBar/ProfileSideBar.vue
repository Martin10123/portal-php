<template>
    <div class="flex items-center gap-5 p-2 shadow-md rounded-lg relative">

        <ul :class="{
            'absolute bg-white w-11/12 bottom-28 left-1/2 transform rounded-lg -translate-x-1/2 shadow-lg': true, 'hidden': !openProfile,
            'md:w-96 md:fixed md:left-72': !openMenu
        }">
            <li class="p-3 border-b cursor-pointer">Ver perfil</li>
            <li class="p-3 border-b cursor-pointer">Configuraciones</li>
            <li class="p-3 border-b cursor-pointer">Cerrar sesión</li>
        </ul>

        <img src="../../Assets/avatar.png" class="w-14 h-auto rounded-full py-3 cursor-pointer" alt="Avatar del usuario"
            @click="onOpenProfile">

        <div>
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
</template>

<script setup>

import { ref } from 'vue';

const { openMenu } = defineProps({
    openMenu: Boolean
})

const openProfile = ref(false);

const onOpenProfile = () => {
    openProfile.value = !openProfile.value;
};

const onCopyEmail = () => {
    navigator.clipboard.writeText("msimarra@cotecmar.com");
    alert("Correo copiado al portapapeles");
}
</script>