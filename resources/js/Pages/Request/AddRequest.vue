<template>
    <main>

        <SideBarMain />

        <section
            class="before:w-full before:h-screen before:bg-slate-200 before:fixed before:top-0 before:-z-10 p-2 before:left-0">
            <h1 class="text-2xl text-center p-4 font-black">REGISTRO SOLICITUD DE SERVICIO DE DISEÑO Y/O INGENIERIA
            </h1>

            <select class="w-full border-none cursor-pointer outline-0 p-4 rounded-lg" id="">
                <option value="Interno">Seleccionar uno</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Operativo">Operativo</option>
                <option value="PDTI">PDTI</option>
            </select>

            <div class="grid ggrid justify-items-center grid-cols-3 bg-white mt-2 rounded-lg">
                <p class="p-3 border-b-2 border-gray-400 w-full text-center">Paso 1</p>
                <p class="p-3 w-full text-center">Paso 2</p>
                <p class="p-3 w-full text-center">Paso 3</p>
            </div>

            <form class="grid w-full bg-white mt-2 p-4 rounded-lg gap-2">

                <h2 class="text-2xl font-medium mb-4">Operativo</h2>

                <!-- <ProjectCase /> -->
                <Interested />

                <div class="flex justify-end pt-2">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Siguiente
                    </button>
                </div>
            </form>

            <div
                class="size-16 rounded-full shadow-md flex justify-center items-center text-2xl cursor-pointer fixed bottom-2 left-2 bg-blue-700 text-white">
                <i class="fa-solid fa-question"></i>
            </div>
        </section>

    </main>

</template>

<script setup>
import Interested from '@/Components/AddRequest/Interested.vue';
// import ProjectCase from '@/Components/AddRequest/ProjectCase.vue';
import SideBarMain from '@/Components/SideBarMain.vue';

</script>