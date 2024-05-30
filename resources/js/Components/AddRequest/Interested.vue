<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { ref } from 'vue';
import Multiselect from 'vue-multiselect';

const options = ref([
    { name: 'Vue.js', code: 'vu' },
    { name: 'Javascript', code: 'js' },
    { name: 'Open Source', code: 'os' }
])
const value = ref([])

</script>

<template>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Interesado" />
        <Multiselect class="p-2 border border-stone-300 rounded-md" v-model="value" placeholder="Agrega una opción"
            label="name" track-by="code" :options="options" :multiple="true">
        </Multiselect>
    </div>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Correo interesado:" />
        <TextInput placeholder="Correo interesado..." />
    </div>
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
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Consecutivo EC:" />
        <TextInput placeholder="Consecutivo EC..." />
    </div>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Grafo:" />
        <TextInput placeholder="Grafo..." />
    </div>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Pendiente:" />
        <TextInput placeholder="Pendiente..." />
    </div>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Tipo de copia:" />
        <select class="border border-stone-300 rounded-lg">
            <option value="******">******</option>
        </select>
    </div>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Fecha de solución (Días háblies):" />
        <TextInput type="date" />
    </div>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Solicitud generada por:" />
        <TextInput placeholder="Solicitud generada por..." />
    </div>
</template>