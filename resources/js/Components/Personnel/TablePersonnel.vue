<script setup>
import { ref } from 'vue';
import EditIcon from '@/Assets/EditIcon.vue';
import TextInput from '../TextInput.vue';

const rows = ref([
    {
        id: 1,
        operacion: 'Acompañamiento al Cliente Interno',
        swbs: '000',
        fase: 'Ingeniería de Transición',
        grafo: '255886_10',
        bloque: '2999',
        estado: 'Activo',
        editing: false
    },
    {
        id: 2,
        operacion: 'Acompañamiento al Cliente Interno',
        swbs: '000',
        fase: 'Ingeniería de Transición',
        grafo: '255886_10',
        bloque: '2999',
        estado: 'Activo',
        editing: false
    },
]);

const startEditing = (index) => {
    rows.value[index].editing = true;
};

const saveEdit = (index) => {
    rows.value[index].editing = false;
};
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption
                class="p-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Proyecto encontrado
                <p class="pt-3 mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    PROYECTO: LANCHA AMBULANCIA MARÍTIMA - LAM-TAM.
                </p>
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">CASO: 2020</p>
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">CODIGO SAP: C-24-0001</p>
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Operación proceso</th>
                    <th scope="col" class="px-6 py-3">SWBS</th>
                    <th scope="col" class="px-6 py-3">Fase</th>
                    <th scope="col" class="px-6 py-3">Grafo</th>
                    <th scope="col" class="px-6 py-3">Bloque</th>
                    <th scope="col" class="px-6 py-3">Estado</th>
                    <th scope="col" class="px-6 py-3"><span class="sr-only">Edit</span></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" :key="row.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                    <template v-if="row.editing">
                        <td class="px-4 py-2">
                            <TextInput v-model="row.operacion" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                            <select v-model="row.swbs"
                                class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer">
                                <option value="000">000</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="600">600</option>
                                <option value="700">700</option>
                                <option value="800">800</option>
                            </select>
                        </td>
                        <td class="px-4 py-2">
                            <TextInput v-model="row.fase" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                            <TextInput v-model="row.grafo" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                            <TextInput v-model="row.bloque" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                            <select v-model="row.estado"
                                class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer">
                                <option value="Inactivo">Inactivo</option>
                                <option value="Activo">Activo</option>
                            </select>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button @click="saveEdit(index)" class="text-blue-600 hover:text-blue-900">Guardar</button>
                        </td>
                    </template>
                    <template v-else>
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ row.operacion }}</td>
                        <td class="px-6 py-4">{{ row.swbs }}</td>
                        <td class="px-6 py-4">{{ row.fase }}</td>
                        <td class="px-6 py-4">{{ row.grafo }}</td>
                        <td class="px-6 py-4">{{ row.bloque }}</td>
                        <td class="px-6 py-4">{{ row.estado }}</td>
                        <td class="px-6 py-4 text-right">
                            <EditIcon @click="startEditing(index)" class="w-5 h-5 cursor-pointer" />
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>
