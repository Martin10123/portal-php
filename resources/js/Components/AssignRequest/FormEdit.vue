<template>
    <Modal :show="refModal" @close="handleShowModal">
        <template #header>
            <h1 class="text-3xl text-center">Editar requerimiento</h1>
        </template>

        <div
            class="p-3 px-4 flex items-center justify-between border-b border-gray-300 rounded-r-2xl rounded-l-2xl shadow-md">
            <label class="text-lg font-semibold">Editar todo</label>

            <TextInput type="checkbox" class="mt-1 block cursor-pointer" @change="toggleShowOtherInfo" />
        </div>

        <div class="pt-4 px-4 flex items-center justify-between">
            <label class="text-lg font-semibold">Caso - Proceso</label>
            <p>3234 - 5</p>
        </div>

        <form class="p-4">
            <div class="grid gap-3 pb-4">
                <div class="grid gap-2">
                    <label class="text-lg">Asignar a</label>
                    <v-select :options="[
                        { label: 'Opción 1', value: 1 },
                        { label: 'Opción 2', value: 2 },
                        { label: 'Opción 3', value: 3 },
                        { label: 'Opción 4', value: 4 },
                        { label: 'Opción 5', value: 5 },
                    ]" placeholder="Asignar a..." />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                        <label class="text-lg">Prioridad</label>
                        <select class="border-gray-300 rounded-md shadow-sm">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div class="grid gap-2">
                        <label class="text-lg">Dificultad</label>
                        <select class="border-gray-300 rounded-md shadow-sm">
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                </div>

                <div class="grid gap-2">
                    <div class="">
                        <label class="text-lg">Atención inmediata</label>
                        <TextInput type="checkbox" class="mt-1 block" />
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-300 grid gap-2" v-if="showOtherInfo">

                <h2 class="text-xl font-semibold py-2">Requerimiento</h2>

                <div class="grid gap-2">
                    <ProjectCase :form="form" />
                </div>
                <div class="py-2 border-t border-gray-300 grid gap-2">
                    <Interested :form="form" />
                </div>
                <div class="py-2 border-t border-gray-300 grid gap-2">
                    <OptionsByPlanos :form="form" />
                </div>
            </div>

            <div class="">
                <button
                    class="w-full bg-primary-cotecmar hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Completar
                </button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import ProjectCase from '@/Components/AddRequest/ProjectCase.vue';
import { useForm } from '@inertiajs/vue3';
import Interested from '@/Components/AddRequest/Interested.vue';
import OptionsByPlanos from '@/Components/AddRequest/OptionsByPlanos.vue';
import { ref } from 'vue';

defineProps({
    refModal: Boolean,
    handleShowModal: Function,
})

const showOtherInfo = ref(false)

const toggleShowOtherInfo = (e) => {
    showOtherInfo.value = e.target.checked
}

const form = useForm({
    buque: "",
    caso: "",
    proceso: "",
    clienteExterno: "",
    tipoBuque: "",
    planta: "",
    interesado: "",
    solicitante: "",
    grafo: "",
    tipoServicio: "",
    servicioSolicitado: "",
    pendiente: "",
    tipoCopia: "",
    fechaSolucion: "",
    solicitudGenerada: "",
    consecutivoEC: "",
    descripcionServicio: "",
    informacionAdjunta: "",
    armador: "",
    casaClasificadora: "",
    numeroIMO: "",
    inspectorCampo: "",
    gerenteProyecto: "",
    files: [],
})

</script>