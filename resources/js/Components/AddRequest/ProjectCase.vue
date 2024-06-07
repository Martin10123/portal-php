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

watch(() => form.buque, ({ caso, buque }) => {
    onSelectProject({
        caso,
        buque
    })
})


const onSelectProject = async ({ caso, buque }) => {
    try {
        const { data } = await axios.post(route('post.project.select'), {
            Buque: "buque",
            Caso: 22,
        })

        // form.buque = buque
        // form.caso = caso
        // form.tipoBuque = data.tipoBuque
        // form.planta = data.planta
        // form.clienteExterno = data.clienteExterno

    } catch (error) {
        console.error('Error en: onSelectProject:', error)
    }
}


onMounted(() => {
    getProjects();
    getEmailsUsers()
})

</script>

<template>
    <div class="scmid995:flex scmid995:gap-2 ">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Caso - proceso *" />
            <TextInput class="bg-gray-300" disabled placeholder="8000..." v-model="form.caso" />
        </div>

        <div class="grid gap-2 flex-1 pt-2 md:p-0">
            <InputLabel class="text-base-more" value="Proyecto *" />
            <v-select v-model="form.buque" :options="projects" placeholder="Proyecto..." label="casoBuque" />
        </div>
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
        <v-select multiple :options="usersEmails" label="usuario" placeholder="Interesado..." v-model="form.interesado">
            <template v-slot:option="option">
                <div>
                    {{ option.correo }}
                </div>
            </template>
        </v-select>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Solicitante *" />
        <v-select multiple :options="usersEmails" label="usuario" placeholder="Solicitante..."
            v-model="form.solicitante">
            <template v-slot:option="option">
                <div>
                    {{ option.correo }}
                </div>
            </template>
        </v-select>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Grafo" />
        <TextInput placeholder="Grafo..." v-model="form.grafo" />
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de servicio *" />
            <select class="border border-stone-300 rounded-lg" v-model="form.tipoServicio">
                <option value="">Seleccionar uno</option>
                <option value="Gestión del Diseño">Gestión del Diseño</option>
                <option value="Consultoría en ingeniería naval">Consultoría en ingeniería naval</option>
                <option value="Otros">Otros</option>
            </select>
        </div>
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Servicio solicitado *" />
            <select class="border border-stone-300 rounded-lg" v-model="form.servicioSolicitado">
                <option value="">Seleccionar uno</option>
                <option value="******">******</option>
            </select>
        </div>
    </div>
</template>