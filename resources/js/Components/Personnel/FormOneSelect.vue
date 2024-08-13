<template>
    <td class="px-4 py-2">
    </td>
    <td class="px-4 py-2">
        <select class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white" v-model="form.operation">
            <option value="">Seleccione</option>
            <option v-if="showOperationOption" :value="form.operation">{{ form.operation }}</option>
            <option v-for="operation in allOperation" :key="operation.detalle" :value="operation.detalle">
                {{ operation.detalle }}
            </option>
        </select>
    </td>
    <td class="px-4 py-2">
        <select class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white" v-model="form.swbs">
            <option value="">Seleccione</option>
            <option v-if="showSWBSOption" :value="form.swbs">{{ form.swbs }}</option>
            <option v-for="swbs in allSWBS" :key="swbs.swbs" :value="swbs.swbs">
                {{ swbs.swbs }}
            </option>
        </select>
    </td>
    <td class="px-4 py-2">
        <select class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white" v-model="form.stage">
            <option value="">Seleccione</option>
            <option v-if="showStageOption" :value="form.stage">{{ form.stage }}</option>
            <option v-for="stage in allStage" :key="stage.fase" :value="stage.fase">
                {{ stage.fase }}
            </option>
        </select>
    </td>
    <td class="px-4 py-2">
        <TextInput class="w-full" placeholder="Grafo..." v-model="form.graph" />
    </td>
    <td class="px-4 py-2">
        <TextInput class="w-full" placeholder="Bloque..." v-model="form.block" />
    </td>
    <td class="px-4 py-2">
        <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" v-model="form.state">
            <div
                class="relative w-14 h-7 bg-red-500 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500">
            </div>
        </label>
    </td>
    <td class="px-2 py-2">
        <div class="w-full flex gap-2">
            <button class="text-blue-500 hover:text-blue-700" @click="onSaveProjectSelect" :disabled="loadingSave"
                :class="{ 'cursor-not-allowed': loadingSave }">
                <i class="fa-solid fa-check text-xl"></i>
            </button>
            <button class="text-red-500 hover:text-red-700" @click="onCanceledProjectSelect" :disabled="loadingSave"
                :class="{ 'cursor-not-allowed': loadingSave }">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
        </div>
    </td>
</template>

<script setup>
import TextInput from '@/Components/TextInput.vue';
import { useFormOneSelect } from '@/Composables';
import Swal from 'sweetalert2';
import { watch } from 'vue';

const props = defineProps({
    allOperation: Array,
    allSWBS: Array,
    allStage: Array,
    selectedProject: Array,
    onCancelEdit: Function,
    onUpdateProjectSelected: Function
});

const { form, loadingSave, onCanceledProjectSelect, onSaveProjectSelect, showOperationOption, showSWBSOption, showStageOption } = useFormOneSelect({ props })

watch(loadingSave, (value) => {
    if (value) {
        Swal.fire({
            title: "Cargando...",
            html: "Espere un momento por favor",
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    }
});

</script>