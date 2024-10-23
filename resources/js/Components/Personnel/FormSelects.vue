<template>
    <Modal :show="showModalForm" @close="handleModalForm">
        <template #header>
            <h1 class="text-lg font-bold">Editar grafos en masa</h1>
        </template>
        <form @submit.prevent="onSaveGrafoEdit">
            <div class="w-full p-4 grid gap-4">

                <div class="w-full grid grid-cols-4 gap-4">
                    <div class="w-full grid gap-2 col-span-1">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Caso</label>
                        <TextInput type="number" class="w-full" placeholder="0000" v-model="form.case" />
                    </div>

                    <div class="w-full grid gap-2 col-span-3">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Proyecto</label>
                        <TextInput class="w-full" placeholder="Proyecto..." v-model="form.project" />
                    </div>
                </div>

                <div class="w-full grid gap-2">
                    <label class="block text-base font-medium text-gray-700 dark:text-gray-400">Operación
                        proceso</label>
                    <select
                        class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white"
                        v-model="form.operation">
                        <option value="">Seleccione</option>
                        <option v-for="operation in allOperation" :key="operation.detalle" :value="operation.detalle">{{
                            operation.detalle }}</option>
                    </select>
                </div>
                <div class="w-full grid gap-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Fase</label>
                    <select
                        class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white"
                        v-model="form.stage">
                        <option value="">Seleccione</option>
                        <option v-for="stage in allStage" :key="stage.fase" :value="stage.fase">{{ stage.fase }}
                        </option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">SWBS</label>
                        <select
                            class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white"
                            v-model="form.swbs">
                            <option value="">Seleccione</option>
                            <option v-for="swbs in allSWBS" :key="swbs.swbs" :value="swbs.swbs">{{ swbs.swbs }}</option>
                        </select>
                    </div>
                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Bloque</label>
                        <TextInput class="w-full" placeholder="0000" v-model="form.block" />
                    </div>

                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Codigo SAP</label>
                        <TextInput class="w-full" placeholder="C-00-0000" v-model="form.codeSap" />
                    </div>

                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Estado - {{ form.state
                            ?
                            'Activo' :
                            'Inactivo'
                            }}</label>
                        <label class="w-fit inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" v-model="form.state">
                            <div
                                class="relative w-14 h-7 bg-red-500 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500">
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <button type="submit" :disabled="loadingSave"
                    :class="{ 'cursor-not-allowed bg-slate-300': loadingSave }"
                    class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                        loadingSave
                            ? 'Guardando...' : 'Guardar' }}</button>
            </div>

        </form>
    </Modal>
</template>

<script setup>
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import { useFormSelects } from '@/Composables';
import { useDataGrafosStore } from '@/pinia/useDataStore';

const props = defineProps({
    showModalForm: Boolean,
    handleModalForm: Function,
    selectedProject: Array,
    onUpdateProjectSelected: Function,
});

const { allOperation, allSWBS, allStage } = useDataGrafosStore()

const { form, loadingSave, onSaveGrafoEdit } = useFormSelects({ props })

</script>