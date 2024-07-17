<template>
    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">
        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section>
            <header class="bg-slate-100 pb-10">
                <div class="py-6">
                    <h1 class="text-2xl text-center font-semibold">Listado de grafos por proyecto</h1>
                </div>
                <article class="w-5/6 m-auto gap-4 grid sm:grid-cols-9">
                    <div class="grid gap-2 col-span-3">
                        <label class="text-lg">Proyecto</label>
                        <v-select class="bg-white" :options="projectsReport" label="Proyecto" placeholder="Proyecto..."
                            v-model="valueProject"></v-select>
                    </div>
                    <div class="grid gap-2 col-span-2">
                        <label class="text-lg">SWBS</label>
                        <select class="border-gray-300 rounded-md" v-model="selectedSwbs">
                            <option value="">Seleccione</option>
                            <option v-for="swbs in SWBSPersonnel" :key="swbs" :value="swbs">{{ swbs }}</option>
                        </select>
                    </div>
                    <div class="grid gap-2 col-span-3">
                        <label class="text-lg">Fase</label>
                        <select class="border-gray-300 rounded-md" v-model="selectedStage">
                            <option value="">Seleccione</option>
                            <option v-for="stage in stageProjectRef" :key="stage" :value="stage">{{ stage }}</option>
                        </select>
                    </div>
                </article>
            </header>

            <div class="p-4">
                <TablePersonnel :project-select="filteredProjects" :selected-stage="selectedStage"
                    :selected-swbs="selectedSwbs" :value-project="valueProject" />
            </div>
        </section>
    </main>
</template>

<script setup>
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import TablePersonnel from '@/Components/Personnel/TablePersonnel.vue';
import { useReports } from '@/Composables';

const {
    SWBSPersonnel, filteredProjects,
    openSidebar, projectsReport,
    selectedStage, selectedSwbs,
    stageProjectRef,
    toggleOpenSidebar, valueProject
} = useReports()

</script>