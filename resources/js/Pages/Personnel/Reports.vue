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
                        <v-select class="bg-white" :options="options" label="Proyecto" placeholder="Proyecto..."
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
                <TablePersonnel :project-select="filteredProjects" />
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import TablePersonnel from '@/Components/Personnel/TablePersonnel.vue';
import { useNavSidebar } from '@/Composables';

const { openSidebar, toggleOpenSidebar } = useNavSidebar();

const valueProject = ref("");
const options = ref([]);
const projectSelect = ref([]);
const stageProjectRef = ref([]);
const SWBSPersonnel = ref([]);
const selectedSwbs = ref("");
const selectedStage = ref("");
const filteredProjects = ref([]);

const fetchReports = async () => {
    try {
        const response = await axios.get(route("get.reports"));
        options.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const fetchReportByProject = async (project) => {
    try {
        const formData = new FormData();
        formData.append("Proyecto", project);

        const response = await axios.post(route("post.report"), formData);
        projectSelect.value = response.data;

        updateUniqueValues({ data: projectSelect.value, varRef: stageProjectRef, label: "Fase" });
        updateUniqueValues({ data: projectSelect.value, varRef: SWBSPersonnel, label: "SWBS" });

        filterProjects();
    } catch (error) {
        console.error(error);
    }
};

const filterProjects = () => {
    filteredProjects.value = projectSelect.value.filter((project) => (
        (!selectedSwbs.value || project.SWBS.toLowerCase().includes(selectedSwbs.value.toLowerCase())) &&
        (!selectedStage.value || project.Fase.toLowerCase().includes(selectedStage.value.toLowerCase()))
    ));
};

const updateUniqueValues = ({ data, varRef, label }) => {
    varRef.value = [...new Set(data.map(item => item[label]))];
};

watch([valueProject, selectedSwbs, selectedStage], ([newValueProject, newSelectedSwbs, newSelectedStage]) => {
    if (newValueProject) {
        fetchReportByProject(newValueProject.Proyecto);
    } else {
        projectSelect.value = [];
        filteredProjects.value = [];
    }
    if (newSelectedSwbs || newSelectedStage) {
        filterProjects();
    }
});

onMounted(fetchReports);
</script>