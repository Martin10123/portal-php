<template>

    <AppLayout title="Gestión de grafos">
        <section>
            <header class="bg-slate-100 dark:bg-transparent pb-10">
                <div class="py-6">
                    <h1 class="text-2xl text-center font-semibold">Listado de grafos por proyecto</h1>
                </div>
                <article class="w-5/6 m-auto gap-4 grid sm:grid-cols-9">
                    <div class="grid gap-2 col-span-3">
                        <label class="text-lg">Proyecto</label>
                        <v-select class="bg-white rounded-md dark:bg-gray-700" :options="projectsReport"
                            label="Proyecto" placeholder="Proyecto..." v-model="valueProject">
                        </v-select>
                    </div>

                    <div class="grid gap-2 col-span-3">
                        <label class="text-lg">Fase</label>
                        <select class="border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                            v-model="selectedStage">
                            <option value="">Seleccione</option>
                            <option v-for="stage in stageProjectRef" :key="stage" :value="stage">{{ stage }}</option>
                        </select>
                    </div>

                    <div class="grid gap-2 col-span-2">
                        <label class="text-lg">SWBS</label>
                        <select class="border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                            v-model="selectedSwbs">
                            <option value="">Seleccione</option>
                            <option v-for="swbs in SWBSPersonnel" :key="swbs" :value="swbs">{{ swbs }}</option>
                        </select>
                    </div>
                </article>
            </header>

            <div class="p-4">
                <TablePersonnel :project-select="paginatedData" :selected-stage="selectedStage"
                    :selected-swbs="selectedSwbs" :value-project="valueProject" :clear-values="clearValues" />
            </div>

            <Paginator :rows="rowsPerPage" :totalRecords="filteredProjects.length" :first="currentPage * rowsPerPage"
                @page="onPageChange" />
        </section>
    </AppLayout>
</template>

<script setup>
import TablePersonnel from '@/Components/Personnel/TablePersonnel.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Paginator from 'primevue/paginator';
import { usePagination, useReports } from '@/Composables';

const {
    SWBSPersonnel,
    filteredProjects,
    projectsReport,
    selectedStage,
    selectedSwbs,
    stageProjectRef,
    valueProject,
    clearValues
} = useReports()

const { currentPage, onPageChange, paginatedData, rowsPerPage } =
    usePagination(filteredProjects);

</script>