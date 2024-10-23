<template>
    <article class="w-full grid grid-cols-5 gap-3 py-4 relative">
        <div class="w-full col-span-3 grid gap-3 bg-white p-2 rounded-md shadow-md dark:bg-slate-800">
            <h2 class="text-xl font-medium pb-2 border-b border-stone-100">
                Gráfico de barras
            </h2>
            <div class="overflow-hidden w-full h-[400px]">
                <v-chart :option="optionsColumnGraphB" autoresize />
            </div>
        </div>

        <div class="w-full col-span-2 grid gap-3 bg-white p-2 rounded-md shadow-md">
            <h2 class="text-xl font-medium pb-2 border-b border-stone-100">Gráfico de pastel</h2>
            <div class="overflow-hidden w-full h-[400px]">
                <v-chart :option="optionsColumnGraphP" autoresize />
            </div>
        </div>

        <div class="w-full col-span-2 grid gap-3 bg-white p-2 rounded-md shadow-md">
            <h2 class="text-xl font-medium pb-2 border-b border-stone-100">Gráfico de pastel</h2>
            <div class="overflow-hidden w-full h-[400px]">
                <v-chart :option="optionsColumnGraphPAct" autoresize />
            </div>
        </div>

        <div class="w-full col-span-3 grid gap-3 bg-white p-2 rounded-md shadow-md dark:bg-slate-800">
            <h2 class="text-xl font-medium pb-2 border-b border-stone-100">
                Gráfico de árbol
            </h2>
            <div class="overflow-hidden w-full h-[400px]">
                <v-chart :option="optionsColumnGraphTree" autoresize />
            </div>
        </div>

        <div class="w-full col-span-5 grid gap-3 bg-white p-2 rounded-md shadow-md dark:bg-slate-800">
            <h2 class="text-xl font-medium pb-2 border-b border-stone-100">
                Gráfico de linea y barra
            </h2>
            <div class="overflow-hidden w-full h-[400px]">
                <v-chart :option="optionsColumnGraphLB" autoresize />
            </div>
        </div>

        <div class="w-full max-w-full col-span-5 grid gap-3 bg-white p-2 rounded-md shadow-md dark:bg-slate-800">
            <TableDeliverable :lista-data-deliverables="listaDataDeliverables"
                :total-data-deliverables="totalDataDeliverables" />
        </div>
        <LoadingStatus v-if="loadingCharts" />
    </article>
</template>

<script setup>
import LoadingStatus from '../LoadingStatus.vue';
import TableDeliverable from './TableDeliverable.vue';

defineProps({
    optionsColumnGraphB: Object,
    optionsColumnGraphP: Object,
    optionsColumnGraphPAct: Object,
    optionsColumnGraphTree: Object,
    optionsColumnGraphLB: Object,
    listaDataDeliverables: Array,
    totalDataDeliverables: Number,
    loadingCharts: Boolean,
});
</script>