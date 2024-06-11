<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

const { form } = defineProps({
    form: Object,
})

const projects = ref([])
const usersEmails = ref([])
const tipoServicios = ref([])
const servicioSolicitado = ref([])

const getProjects = async () => {
    try {
        const { data } = await axios.get(route('get.projects'))

        projects.value = data.map(project => ({
            buque: project.buque,
            caso: project.caso,
            casoBuque: `${project.caso} - ${project.buque}`
        }))

    } catch (error) {
        console.log("Error en getProjects: ", error);
    }
}

const getEmailsUsers = async () => {
    try {
        const { data } = await axios.get(route('get.users'))

        usersEmails.value = data

    } catch (error) {
        console.log("Error en getEmailsUsers: ", error);
    }
}

const getTipoServicios = async () => {
    try {
        const { data } = await axios.get(route('get.tipoServicios'))

        tipoServicios.value = data

    } catch (error) {
        console.log("Error en getTipoServicios: ", error);
    }
}

watch(() => form.buque, (project) => {
    onSelectProject(project)
})


const onSelectProject = async (project) => {

    if (project === null) {
        return
    }

    try {
        const { data } = await axios.post(route('post.project.select'), {
            Buque: project.buque,
            Caso: project.caso,
        })

        form.caso = project.caso

        form.tipoBuque = data.tipoBuque ? data.tipoBuque : ''
        form.planta = data.planta ? data.planta : ''
        form.clienteExterno = data.clienteExterno ? data.clienteExterno : ''

    } catch (error) {
        console.error('Error en: onSelectProject:', error)
    }
}

const onSelectTipoServicio = async (tipoServicio) => {
    if (tipoServicio === null || tipoServicio === '') {
        return
    }

    try {
        const { data } = await axios.post(route('post.getTipoServicio'), {
            idTservicio: tipoServicio,
        })

        servicioSolicitado.value = data

    } catch (error) {
        console.error('Error en: onSelectTipoServicio:', error)
    }
}

watch(() => form.tipoServicio, (tipoServicio) => {
    onSelectTipoServicio(tipoServicio)
})

onMounted(() => {
    getProjects();
    getEmailsUsers()
    getTipoServicios()
})

</script>

<template>
    <div class="grid gap-2 flex-1 pt-2 md:p-0">
        <InputLabel class="text-base-more" value="Proyecto *" />
        <v-select v-model="form.buque" :options="projects" placeholder="Proyecto..." label="casoBuque" />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Cliente externo *" />
        <TextInput placeholder="Cliente externo..." v-model="form.clienteExterno" />
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2 w-full">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de buque *" />
            <select class="border border-stone-300 rounded-lg" v-model="form.tipoBuque">
                <option value="">Seleccionar uno</option>
                <option value="Militar">Militar</option>
                <option value="Comercial">Comercial</option>
                <option value="N/A">N/A</option>
            </select>
        </div>

        <div class="grid gap-2 pt-2 md:p-0">
            <InputLabel class="text-base-more" value="Planta *" />
            <select class="border border-stone-300 rounded-lg" v-model="form.planta">
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
        <InputLabel class="text-base-more" value="Interesado *" />
        <v-select multiple :options="usersEmails" placeholder="Interesado..." v-model="form.interesado"
            :get-option-label="(option) => option.nombre">
            <template v-slot:option="option">
                <div>
                    {{ option.correo }}
                    <br>
                    <cite class="text-sm">{{ option.nombre }}</cite>
                </div>
            </template>
        </v-select>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Solicitante *" />
        <v-select multiple :options="usersEmails" placeholder="Solicitante..."
            :get-option-label="(option) => option.nombre" v-model="form.solicitante">
            <template v-slot:option="option">
                <div>
                    {{ option.correo }}
                    <br>
                    <cite class="text-sm">{{ option.nombre }}</cite>
                </div>
            </template>
        </v-select>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Grafo" />
        <TextInput placeholder="Grafo..." v-model="form.grafo" />
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2 w-full">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de servicio *" />
            <select class="border border-stone-300 rounded-lg w-full" v-model="form.tipoServicio">
                <option value="">Seleccionar uno</option>
                <option v-for="option in tipoServicios" :key="option.id" :value="option.id">
                    {{ option.descripcion }}</option>
            </select>
        </div>
        <div class="grid gap-2 pt-2 md:p-0">
            <InputLabel class="text-base-more" value="Servicio solicitado *" />
            <select class="border border-stone-300 rounded-lg w-full" v-model="form.servicioSolicitado">
                <option v-for="serSoli in servicioSolicitado" :key="serSoli.NombreTipo" :value="serSoli">
                    {{ serSoli.NombreTipo }}
                </option>
            </select>
        </div>
    </div>
</template>