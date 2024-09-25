<template>
    <div class="p-4 col-span-2">
        <div class="flex items-center gap-2 pb-4">
            <Link href="/Sigedin/Personnel/Reports">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>
            </Link>

            <h1 class="text-xl">Subir grafos desde un archivo excel</h1>
        </div>

        <div class="w-full">
            <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>

                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click para cargar archivo</span>
                    </p>
                    <p class="text-base text-gray-600 dark:text-gray-400 px-4" v-if="!loadingExcel">
                        {{
                            file
                                ? file.name
                                : "No has seleccionado ningun archivo"
                        }}
                    </p>
                    <p class="text-base text-gray-600 dark:text-gray-400 px-4" v-else>
                        Cargando archivo...
                    </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" accept=".xls,.xlsx" @change="handleFileChange" />
            </label>
            <div class="flex justify-between">
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2" v-if="dataExcel.rowsCount > 0">
                    {{ dataExcel.rowsCount }} registros fuerón encontrados y
                    están pendientes a cargar
                </p>
            </div>
        </div>

        <button
            class="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :class="{ 'cursor-not-allowed': loadingFile }" @click="onLoadSaveExcel" :disabled="loadingFile"
            :aria-disabled="loadingFile" v-if="dataExcel.rowsCount > 0">
            {{ loadingFile
                ? "Cargando..."
                : somebodyExcelEdit ? 'Guardar archivos modificados' : 'Cargar archivo excel sin modificaciones'
            }}
        </button>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';


const props = defineProps({
    somebodyExcelEdit: Boolean,
    dataExcel: Object,
    loadingExcel: Boolean,
    loadingFile: Boolean,
    file: Object,
    onLoadSaveExcel: Function,
    handleFileChange: Function,
});

</script>
