<template>
    <div class="w-full grid grid-cols-8 gap-3">
        <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2 dark:bg-slate-800">
            <label class="font-medium">Año</label>
            <div class="overflow-hidden">
                <MultiSelect v-model="form.anio" :options="listYears" filter placeholder="Selecciona una división"
                    :maxSelectedLabels="1" class="w-full" />
            </div>
        </div>
        <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2 dark:bg-slate-800">
            <label class="font-medium">Mes</label>
            <div class="overflow-hidden">
                <MultiSelect v-model="form.mes" :options="listMouth" optionLabel="name" filter
                    placeholder="Selecciona una división" :maxSelectedLabels="1" class="w-full" />
            </div>
        </div>
        <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2 relative dark:bg-slate-800">
            <button
                class="w-full absolute right-0 -top-14 z-50 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4 shadow-md"
                v-if="isSearchDivision" @click="onGetPersonasXGerencia">
                Buscar
            </button>

            <label class="font-medium">División</label>
            <div class="overflow-hidden">
                <MultiSelect v-model="form.division" :options="listDivision" optionLabel="DivisionName" filter
                    placeholder="Selecciona una división" :maxSelectedLabels="1" class="w-full" />
            </div>
        </div>
        <div class="w-full shadow-md bg-white rounded-md p-4 grid col-span-2 gap-2 dark:bg-slate-800">
            <label class="font-medium">Nombre</label>
            <div class="overflow-hidden">
                <MultiSelect v-model="form.persona" :options="listNombresXGerencia" optionLabel="Nombre" filter
                    placeholder="Selecciona un nombre" :maxSelectedLabels="1" class="w-full"
                    :loading="isLoadingNames" />
            </div>
        </div>
        <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2 dark:bg-slate-800">
            <label class="font-medium">Caso</label>
            <div class="overflow-hidden">
                <MultiSelect v-model="form.caso" :options="listCasoBuque" optionLabel="Caso" filter
                    placeholder="Selecciona un caso" :maxSelectedLabels="1" class="w-full" :loading="isLoadingCasos"
                    @filter="onGetCasoBuque" :selection-limit="1" />
            </div>
        </div>
        <div class="w-full shadow-md bg-white rounded-md p-4 col-span-2 grid gap-2 dark:bg-slate-800">
            <label class="font-medium">Buque</label>
            <div class="overflow-hidden">
                <MultiSelect v-model="form.buque" :options="listCasoBuque" disabled optionLabel="Proyecto" filter
                    placeholder="Selecciona un buque" :maxSelectedLabels="1" class="w-full" :selection-limit="1" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBarChart } from "@/Composables";
import MultiSelect from "primevue/multiselect";

const {
    listDivision,
    listMouth,
    listYears,
} = useBarChart();

defineProps({
    listNombresXGerencia: Array,
    listCasoBuque: Array,
    isLoadingNames: Boolean,
    isLoadingCasos: Boolean,
    isSearchDivision: Boolean,
    form: Object,
    onGetPersonasXGerencia: Function,
    onGetCasoBuque: Function,
});

</script>