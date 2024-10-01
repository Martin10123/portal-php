<template>

    <AppLayout title="Grafico de pastel">

        <section class="p-4 bg-slate-50 border-l dark:bg-black">
            <div class="grid gap-6">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-medium text-gray-300">
                        Control de seguimiento de proyecto
                    </h1>

                    <div class="flex gap-2">
                        <button
                            class="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded mt-4 shadow-md"
                            :class="{ 'cursor-not-allowed bg-gray-800 hover:bg-gray-800': isDisabledClean }"
                            :disabled="isDisabledClean" @click="onCleanForm">
                            Limpiar
                        </button>
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4 shadow-md"
                            @click="onViewReport">
                            Reporte
                        </button>
                    </div>
                </div>

                <FormSelectsGrafic :form="form" :is-loading-casos="isLoadingCasos" :is-loading-names="isLoadingNames"
                    :is-search-division="isSearchDivision" :is-disabled-clean="isDisabledClean"
                    :list-caso-buque="listCasoBuque" :list-nombres-x-gerencia="listNombresXGerencia"
                    :on-get-personas-x-gerencia="onGetPersonasXGerencia" :on-get-caso-buque="onGetCasoBuque" />
            </div>

            <GraphicsCharts :options-column-graph-b="optionsColumnGraphB" :options-column-graph-p="optionsColumnGraphP"
                :options-column-graph-p-act="optionsColumnGraphPAct" :options-column-graph-tree="optionsColumnGraphTree"
                :loading-charts="loadingCharts" />
        </section>
    </AppLayout>
</template>

<script setup>
import FormSelectsGrafic from "@/Components/Charts/FormSelectsGrafic.vue";
import GraphicsCharts from "@/Components/Charts/GraphicsCharts.vue";
import { useBarChart } from "@/Composables";
import AppLayout from "@/Layouts/AppLayout.vue";

const {
    form,
    isLoadingNames,
    isLoadingCasos,
    isSearchDivision,
    isDisabledClean,
    listCasoBuque,
    listNombresXGerencia,
    loadingCharts,
    onViewReport,
    onGetPersonasXGerencia,
    optionsColumnGraphB,
    optionsColumnGraphP,
    optionsColumnGraphPAct,
    optionsColumnGraphTree,
    onGetCasoBuque,
    onCleanForm
} = useBarChart();


</script>