<template>
    <Modal :show="showModalForm" @close="startEditing">
        <template #header>
            <h1 class="text-lg font-bold">Editar grafo seleccionado</h1>
        </template>
        <form @submit.prevent="onSaveGrafoEdit">
            <div class="w-full p-4 grid gap-4">

                <div class="w-full grid grid-cols-2 gap-4">
                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Caso</label>
                        <TextInput type="number" class="w-full" placeholder="0000" v-model="form.caso" />
                    </div>

                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Grafo op</label>
                        <TextInput class="w-full" placeholder="C_234932" v-model="form.grafo_op" />
                    </div>
                </div>

                <div class="w-full grid gap-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Proyecto</label>
                    <v-select v-model="form.proyecto" :options="dataGrafos.projects" label="Proyecto" taggable
                        placeholder="Seleccionar" />
                </div>

                <div class="w-full grid gap-2">
                    <label class="block text-base font-medium text-gray-700 dark:text-gray-400">Operación
                        proceso</label>
                    <select
                        class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white"
                        v-model="form.operacion_proceso">
                        <option value="">Seleccione</option>
                        <option v-if="form.operacion_proceso" :value="form.operacion_proceso">{{ form.operacion_proceso
                            }}
                        </option>
                        <option v-for="operation in dataGrafos.allOperation" :key="operation.detalle"
                            :value="operation.detalle">{{ operation.detalle }}</option>
                    </select>
                </div>
                <div class="w-full grid gap-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Fase</label>
                    <select
                        class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white"
                        v-model="form.fase">
                        <option v-if="form.fase" :value="form.fase">{{ form.fase }}</option>
                        <option v-for="stage in dataGrafos.allStage" :key="stage.fase" :value="stage.fase">
                            {{ stage.fase }}
                        </option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">SWBS</label>
                        <select
                            class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white"
                            v-model="form.swbs">
                            <option v-for="swbs in dataGrafos.allSWBS" :key="swbs.swbs" :value="swbs.swbs">
                                {{ swbs.swbs }}
                            </option>
                        </select>
                    </div>
                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Bloque</label>
                        <TextInput class="w-full" placeholder="0000" v-model="form.bloque" />
                    </div>

                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Codigo SAP</label>
                        <TextInput class="w-full" placeholder="C-00-0000" v-model="form.codigo_sap" />
                    </div>

                    <div class="w-full grid gap-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Estado - {{
                            form.estado
                                ?
                                'Activo' :
                                'Inactivo'
                        }}</label>
                        <label class="w-fit inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" v-model="form.estado">
                            <div
                                class="relative w-14 h-7 bg-red-500 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500">
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="p-4 flex gap-4">
                <button type="submit" :disabled="loadingSave"
                    :class="{ 'cursor-not-allowed bg-slate-300': loadingSave }" @click="updateGraph()"
                    class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                        loadingSave
                            ? 'Guardando...' : 'Guardar' }}</button>
                <button :disabled="loadingSave" :class="{ 'cursor-not-allowed bg-slate-300': loadingSave }"
                    @click="() => startEditing(undefined)"
                    class="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Cancelar</button>
            </div>

        </form>
    </Modal>
</template>

<script setup>
import TextInput from "@/Components/TextInput.vue";
import Modal from "@/Components/Modal.vue";
import { useDataGrafosStore } from "@/pinia/useDataStore";
import { onMounted, ref, watch } from "vue";
import { useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";

const props = defineProps({
    projectSelectToEdit: Object,
    startEditing: Function,
    showModalForm: Boolean,
    onUpdateGraphSelect: Function
});

const dataGrafos = useDataGrafosStore();
const loadingSave = ref(false);
const form = useForm({
    grafo_op: "",
    proyecto: "",
    codigo_sap: "",
    fase: "",
    swbs: "***",
    operacion_proceso: "***",
    Id_Actividad: "",
    estado: true,
    bloque: "-",
    caso: ""
});

const getAllProjects = () => {
    dataGrafos.getAllProjects();
};

watch(
    () => props.projectSelectToEdit,
    (value) => {
        if (value) {
            form.grafo_op = value.grafo_op;
            form.caso = value.caso;
            form.proyecto = value.proyecto;
            form.operacion_proceso = value.operacion_proceso;
            form.fase = value.fase;
            form.swbs = value.swbs;
            form.bloque = value.bloque;
            form.codigo_sap = value.codigo_sap;
        }
    }
)

function validateForm(form) {
    const errors = {};

    if (typeof form.grafo_op !== 'string' || form.grafo_op.trim() === "") {
        errors.grafo_op = "El campo grafo op es obligatorio";
    }

    if (typeof form.caso !== 'string' || Number(form.caso) <= 0) {
        errors.caso = "El campo caso es obligatorio.";
    }

    if (typeof form.proyecto !== 'string' || form.proyecto.trim() === "") {
        errors.proyecto = "El campo proyecto es obligatorio";
    }

    if (typeof form.operacion_proceso !== 'string' || form.operacion_proceso.trim() === "") {
        errors.operacion_proceso = "El campo Operación proceso es obligatorio";
    }

    if (typeof form.fase !== 'string' || form.fase.trim() === "") {
        errors.fase = "El campo fase es obligatorio";
    }

    if (typeof form.swbs !== 'string' || form.swbs.trim() === "") {
        errors.swbs = "El campo swbs es obligatorio";
    }

    if (typeof form.bloque !== 'string' || form.bloque.trim() === "") {
        errors.bloque = "El campo bloque es obligatorio. Si lo dejara vacio agregue un guión (-)";
    }

    if (typeof form.codigo_sap !== 'string' || form.codigo_sap.trim() === "") {
        errors.codigo_sap = "El campo codigo SAP es obligatorio";
    }

    return errors;
}

const updateGraph = async () => {
    const errors = validateForm(form.data());

    let grapfPendient = {
        ...form.data(),
        id: props.projectSelectToEdit.id
    };

    if (Object.keys(errors).length > 0) {

        props.startEditing(undefined);

        const { isConfirmed } = await Swal.fire({
            title: "Error en el formulario",
            text: Object.values(errors).join("\n"),
            icon: "error",
            confirmButtonText: "Aceptar",
        });

        if (isConfirmed) {
            props.startEditing(grapfPendient)
            grapfPendient = null;
        }

    } else {
        props.onUpdateGraphSelect(grapfPendient);
        grapfPendient = null;
    }
}

onMounted(() => {
    getAllProjects();
});
</script>
