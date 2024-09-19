<template>

    <Head title="Grafico de pastel" />

    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">
        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section class="p-4 bg-slate-50 border-l dark:bg-black">
            <div class="grid gap-6">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-medium text-gray-300">
                        Control de seguimiento de proyecto
                    </h1>

                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4 shadow-md"
                        @click="onViewReport">
                        Reporte
                    </button>
                </div>

                <div class="w-full grid grid-cols-8 gap-3">
                    <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2 dark:bg-slate-800">
                        <label class="font-medium">Año</label>
                        <div class="overflow-hidden">
                            <MultiSelect v-model="form.anio" :options="listYears" filter
                                placeholder="Selecciona una división" :maxSelectedLabels="1" class="w-full" />
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
                            <MultiSelect v-model="form.division" :options="listDivision" optionLabel="DivisionName"
                                filter placeholder="Selecciona una división" :maxSelectedLabels="1" class="w-full" />
                        </div>
                    </div>
                    <div class="w-full shadow-md bg-white rounded-md p-4 grid col-span-2 gap-2 dark:bg-slate-800">
                        <label class="font-medium">Nombre</label>
                        <div class="overflow-hidden">
                            <MultiSelect v-model="form.persona" :options="listNombresXGerencia" optionLabel="Nombre"
                                filter placeholder="Selecciona un nombre" :maxSelectedLabels="1" class="w-full"
                                :loading="isLoadingNames" />
                        </div>
                    </div>
                    <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2 dark:bg-slate-800">
                        <label class="font-medium">Caso</label>
                        <div class="overflow-hidden">
                            <MultiSelect v-model="form.buque" :options="listCasoBuque" optionLabel="Caso" filter
                                placeholder="Selecciona un caso" :maxSelectedLabels="1" class="w-full"
                                :selection-limit="1" />
                        </div>
                    </div>
                    <div class="w-full shadow-md bg-white rounded-md p-4 col-span-2 grid gap-2 dark:bg-slate-800">
                        <label class="font-medium">Buque</label>
                        <div class="overflow-hidden">
                            <MultiSelect v-model="form.buque" :options="listCasoBuque" optionLabel="Proyecto" filter
                                placeholder="Selecciona un buque" :maxSelectedLabels="1" class="w-full"
                                :selection-limit="1" />
                        </div>
                    </div>
                </div>
            </div>

            <article class="w-full grid grid-cols-5 gap-3 py-4 relative">
                <div class="w-full col-span-3 grid gap-3 bg-white p-2 rounded-md shadow-md dark:bg-slate-800">
                    <h2 class="text-xl font-medium pb-2 border-b border-stone-100">
                        Gráfico de barras
                    </h2>
                    <div style="overflow: auto; white-space: nowrap;">
                        <v-chart :option="optionsColumnGraph" autoresize class="chart"
                            style="width: 100%; height: 400px;" />
                    </div>

                </div>
                <LoadingStatus v-if="loadingCharts" />
            </article>
        </section>
    </main>
</template>

<script setup>
import Navbar from "@/Components/SideBar/Navbar.vue";
import SideBarMain from "@/Components/SideBar/SideBarMain.vue";
import MultiSelect from "primevue/multiselect";
import LoadingStatus from "@/Components/LoadingStatus.vue";
import { useBarChart } from "@/Composables";
import { Head } from "@inertiajs/vue3";

const {
    form,
    isLoadingNames,
    isSearchDivision,
    listCasoBuque,
    listDivision,
    listMouth,
    listNombresXGerencia,
    listYears,
    loadingCharts,
    onViewReport,
    openSidebar,
    toggleOpenSidebar,
    onGetPersonasXGerencia,
    optionsColumnGraph
} = useBarChart();
</script>