<template>
    <td class="px-4 py-2">
    </td>
    <td class="px-4 py-2">
        <select class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer" v-model="form.operation">
            <option value="">Seleccione</option>
            <option v-if="showOperationOption" :value="form.operation">{{ form.operation }}</option>
            <option v-for="operation in allOperation" :key="operation.detalle" :value="operation.detalle">
                {{ operation.detalle }}
            </option>
        </select>
    </td>
    <td class="px-4 py-2">
        <select class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer" v-model="form.swbs">
            <option value="">Seleccione</option>
            <option v-if="showSWBSOption" :value="form.swbs">{{ form.swbs }}</option>
            <option v-for="swbs in allSWBS" :key="swbs.swbs" :value="swbs.swbs">
                {{ swbs.swbs }}
            </option>
        </select>
    </td>
    <td class="px-4 py-2">
        <select class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer" v-model="form.stage">
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
            <button class="text-blue-500 hover:text-blue-700" @click="onSaveProjectSelect">
                <i class="fa-solid fa-check text-xl"></i>
            </button>
            <button class="text-red-500 hover:text-red-700" @click="onCanceledProjectSelect">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
        </div>
    </td>
</template>

<script setup>
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { onMounted } from 'vue';

const props = defineProps({
    allOperation: Array,
    allSWBS: Array,
    allStage: Array,
    selectedProject: Array,
    onCancelEdit: Function,
    onUpdateProjectSelected: Function
});

const showOperationOption = ref(false);
const showSWBSOption = ref(false);
const showStageOption = ref(false);

const form = useForm({
    operation: props.selectedProject[0].Operación_Proceso,
    swbs: props.selectedProject[0].SWBS,
    stage: props.selectedProject[0].Fase,
    graph: props.selectedProject[0].Grafo_OP,
    block: props.selectedProject[0].Bloque || "N/A",
    state: true
})

const onSaveProjectSelect = async () => {

    try {

        const { isConfirmed } = await Swal.fire({
            title: "Seguro que quieres guardar los cambios?",
            text: "Los datos se actualizarán en la base de datos.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#023f86",
            cancelButtonColor: "red",
            confirmButtonText: "Actualizar"
        })

        if (!isConfirmed) return;

        const formData = new FormData();

        formData.append('operation', form.operation);
        formData.append('swbs', form.swbs);
        formData.append('stage', form.stage);
        formData.append('graph', form.graph);
        formData.append('block', form.block);
        formData.append('state', form.state ? "Activo" : "Inactivo");
        formData.append('id', props.selectedProject[0].Id);

        const response = await axios.post(route("reports.updateGraph"), formData);

        console.log(response);

        if (response.status === 200) {
            Swal.fire({
                title: "Datos actualizados",
                text: "Los datos se han actualizado correctamente.",
                icon: "success",
                confirmButtonColor: "#023f86",
            });

            props.onUpdateProjectSelected(response.data);

            props.onCancelEdit(props.selectedProject[0].Id);

        }

    } catch (error) {
        console.log(error);
    }
}

const onCanceledProjectSelect = () => {
    Swal.fire({
        title: "Seguro que quieres cancelar la edición?",
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        confirmButtonColor: "red",
        denyButtonText: `Seguir`,
        denyButtonColor: "green",
    }).then((result) => {
        if (result.isConfirmed) {
            props.onCancelEdit(props.selectedProject[0].Id);
        }
    });
}

onMounted(() => {
    if (!props.allOperation.some(operation => operation.detalle === props.selectedProject[0].Operación_Proceso)) {
        showOperationOption.value = true;
    }

    if (!props.allSWBS.some(swbs => swbs.swbs === props.selectedProject[0].SWBS)) {
        showSWBSOption.value = true;
    }

    if (!props.allStage.some(stage => stage.fase === props.selectedProject[0].Fase)) {
        showStageOption.value = true;
    }

})

</script>