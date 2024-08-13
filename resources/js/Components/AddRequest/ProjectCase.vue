<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { useProjectCase } from '@/Composables/useProjectCase';
import InputError from '../InputError.vue';

const { form } = defineProps({
    form: Object,
})

const {
    projects,
    servicioSolicitado,
    tipoServicios,
    usersEmails,
    listPlanta,
    userActive
} = useProjectCase({ form })

</script>

<template>
    <div class="grid gap-2 flex-1 pt-2 md:p-0">
        <InputLabel class="text-base-more" value='Proyecto *' />
        <v-select class="dark:bg-gray-700 dark:text-white rounded-md" v-model="form.buque" taggable :options="projects" placeholder="Proyecto..." label="buqueCaso" />
        <InputError :message="form.errors.buque" />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Cliente externo *" />
        <TextInput class="dark:border-none" placeholder="Cliente externo..." v-model="form.clienteExterno" />
        <InputError :message="form.errors.clienteExterno" />
    </div>

    <div class="grid scmid995:grid-cols-2 gap-2 w-full">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de buque *" />
            <select class="border border-stone-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" v-model="form.tipoBuque">
                <option value="">Seleccionar uno</option>
                <option value="Militar">Militar</option>
                <option value="Comercial">Comercial</option>
                <option value="N/A">N/A</option>
            </select>
            <InputError :message="form.errors.tipoBuque" />
        </div>

        <div class="grid gap-2 pt-2 md:p-0">
            <InputLabel class="text-base-more" value="Planta *" />
            <select class="border border-stone-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" v-model="form.planta">
                <option value="">Seleccionar uno</option>
                <option v-for="planta in listPlanta" :key="planta" :value="planta.Planta">
                    {{ planta.Planta }}
                </option>
            </select>
            <InputError :message="form.errors.planta" />
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Interesado *" />
        <v-select class="dark:bg-gray-700 dark:text-white rounded-md" multiple :options="usersEmails" placeholder="Interesado..." v-model="form.interesado"
            :get-option-label="(option) => option.nombre">
            <template v-slot:option="option">
                <div>
                    {{ option.correo }}
                    <br>
                    <cite class="text-sm">{{ option.nombre }}</cite>
                </div>
            </template>
        </v-select>
        <InputError :message="form.errors.interesado" />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Solicitante *" />
        <v-select class="dark:bg-gray-700 dark:text-white rounded-md" multiple :options="usersEmails" placeholder="Solicitante..."
            :get-option-label="(option) => option.nombre" v-model="form.solicitante">
            <template v-slot:option="option">
                <div>
                    {{ option.correo }}
                    <br>
                    <cite class="text-sm">{{ option.nombre }}</cite>
                </div>
            </template>
        </v-select>
        <InputError :message="form.errors.solicitante" />
    </div>

    <div class="grid scmid995:grid-cols-2 gap-2 w-full">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de servicio *" />
            <select class="border border-stone-300 rounded-lg w-full dark:bg-gray-700 dark:text-white dark:border-none" v-model="form.tipoServicio">
                <option value="">Seleccionar uno</option>
                <option v-for="option in tipoServicios" :key="option.id" :value="option">
                    {{ option.descripcion }}</option>
            </select>
            <InputError :message="form.errors.tipoServicio" />
        </div>
        <div class="grid gap-2 pt-2 md:p-0">
            <InputLabel class="text-base-more" value="Servicio solicitado *" />
            <select class="border border-stone-300 rounded-lg w-full dark:bg-gray-700 dark:text-white dark:border-none" v-model="form.servicioSolicitado">
                <option v-for="serSoli in servicioSolicitado" :key="serSoli.NombreTipo" :value="serSoli">
                    {{ serSoli.NombreTipo }}
                </option>
            </select>
            <InputError :message="form.errors.servicioSolicitado" />
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Solicitud generada por:" />
        <TextInput class="bg-gray-300 dark:border-none" disabled placeholder="Solicitud generada por..." v-model="userActive.name" />
    </div>
</template>