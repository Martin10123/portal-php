<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { useProjectCase } from '@/composables/useProjectCase';

const { form } = defineProps({
    form: Object,
})

const {
    projects,
    servicioSolicitado,
    tipoServicios,
    usersEmails,
    listPlanta
} = useProjectCase({ form })

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
                <option v-for="planta in listPlanta" :key="planta" :value="planta">
                    {{ planta }}
                </option>

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
        <InputLabel class="text-base-more" value="Grafo (Si no agrega un grafo este se pondra como pendiente) *" />
        <TextInput placeholder="Grafo..." v-model="form.grafo" />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Fecha de solución (Días háblies):" />
        <VueDatePicker v-model="form.fechaSolucion" placeholder="Fecha de solución..." :disabled-week-days="[6, 0]"
            :min-date="new Date()" auto-apply />
    </div>
    <!-- <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2 w-full">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de servicio *" />
            <select class="border border-stone-300 rounded-lg w-full" v-model="form.tipoServicio">
                <option value="">Seleccionar uno</option>
                <option v-for="option in tipoServicios" :key="option.id" :value="option">
                    {{ option.descripcion }}</option>
            </select>
        </div>
        <div class="grid gap-2 pt-2 md:p-0">
            <InputLabel class="text-base-more" value="Servicio solicitado *" />
            <select class="border border-stone-300 rounded-lg w-full" v-model="form.servicioSolicitado">
                <option v-for="serSoli in servicioSolicitado" :key="serSoli.NombreTipo" :value="serSoli.NombreTipo">
                    {{ serSoli.NombreTipo }}
                </option>
            </select>
        </div>
    </div> -->
</template>