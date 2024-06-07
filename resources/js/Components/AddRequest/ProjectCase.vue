<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const searchProject = ref('')

const projects = ref([])

const getProjects = async () => {
    try {
        const { data } = await axios.get(route('get.projects'))

        projects.value = data
    } catch (error) {
        console.log(error);
    }
}

const onSelectProject = async (project) => {

    try {
        const response = await axios.post(route('get.project.select'), {
            project
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }

}

onMounted(() => {
    getProjects();
})

</script>

<template>
    <div class="scmid995:flex scmid995:gap-2 ">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Caso - proceso" />
            <TextInput class="bg-slate-300" disabled placeholder="8000..." />
        </div>

        <div class="grid gap-2 flex-1 pt-2 md:p-0">
            <InputLabel class="text-base-more" value="Proyecto" />
            <v-select v-model="searchProject" :options="projects" placeholder="Proyecto..." label="buque">
                <template v-slot:option="option">
                    <div @click="() => onSelectProject(option)">
                        {{ option.caso }} - {{ option.buque }}
                    </div>
                </template>
            </v-select>
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Cliente externo" />
        <TextInput placeholder="Cliente externo..." />
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2 w-full">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de buque" />
            <select class="border border-stone-300 rounded-lg">
                <option value="">Seleccionar uno</option>
                <option value="Militar">Militar</option>
                <option value="Comercial">Comercial</option>
                <option value="N/A">N/A</option>
            </select>
        </div>

        <div class="grid gap-2 pt-2 md:p-0">
            <InputLabel class="text-base-more" value="Planta" />
            <select class="border border-stone-300 rounded-lg">
                <option value="">Seleccionar uno</option>
                <option value="GEBOC">GEBOC</option>
                <option value="GECON">GECON</option>
                <option value="GECTI">GECTI</option>
                <option value="GEDIN">GEDIN</option>
                <option value="GEMAN">GEMAN</option>
                <option value="PCTMAR">PCTMAR</option>
                <option value="VPEXE">VPEXE</option>
                <option value="VPT&O">VPT&O</option>
            </select>
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Interesado:" />
        <v-select multiple placeholder="Interesado..." />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Solicitante:" />
        <v-select multiple placeholder="Solicitante..." />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Grafo:" />
        <TextInput placeholder="Grafo..." />
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de servicio:" />
            <select class="border border-stone-300 rounded-lg">
                <option value="">Seleccionar uno</option>
                <option value="Gestión del Diseño">Gestión del Diseño</option>
                <option value="Consultoría en ingeniería naval">Consultoría en ingeniería naval</option>
                <option value="Otros">Otros</option>
            </select>
        </div>
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Servicio solicitado:" />
            <select class="border border-stone-300 rounded-lg">
                <option value="******">******</option>
            </select>
        </div>
    </div>
</template>