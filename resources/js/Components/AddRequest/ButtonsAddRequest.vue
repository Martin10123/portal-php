<template>
    <div class="flex justify-between items-center">
        <div class="flex justify-end pt-2" v-show="tabs != 1">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="(e) => prevTab(e)">
                Regresar
            </button>
        </div>
        <div class="flex justify-end pt-2" v-show="tabs != 2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="(e) => nextTab(e)">
                Siguiente
            </button>
        </div>
        <div class="flex justify-end pt-2" v-show="tabs == 2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
        </div>
    </div>
</template>

<script setup>

const { nextTab, prevTab, tabs } = defineProps({
    tabs: Number,
    nextTab: Function,
    prevTab: Function,
});

</script>