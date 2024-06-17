<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import OptionsByPlanos from './OptionsByPlanos.vue';
import { useInterested } from '@/Composables/useInterested';
import InputError from '../InputError.vue';
import { Link } from '@inertiajs/vue3';

const { form } = defineProps({
    form: Object,
})

const {
    disabledDatesHolidays,
    disabledTipoCopia,
    getFiles,
    validIfOptionsContainSomeWordWithPlano,
} = useInterested({ form })

</script>

<template>
    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2">
        <div class="grid gap-2 mb-2 md:mb-0">
            <InputLabel class="text-base-more" value="Tipo de copia:" />
            <select :class="['border border-stone-300 rounded-lg', disabledTipoCopia ? 'bg-gray-300' : '']"
                :disabled="disabledTipoCopia" v-model="form.tipoCopia">
                <option value="">Selecciona uno</option>
                <option value="Fisico">Fisico</option>
                <option value="Digital">Digital</option>
            </select>
            <InputError :message="form.errors.tipoCopia" />
        </div>
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Fecha de solución (Días háblies):" />
            <VueDatePicker v-model="form.fechaSolucion" placeholder="Fecha de solución..." :disabled-week-days="[6, 0]"
                :min-date="new Date()" auto-apply :disabled-dates="disabledDatesHolidays" />
            <InputError :message="form.errors.fechaSolucion" />
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Descripción servicio:" />
        <textarea class="border rounded-lg border-stone-300 h-20 resize-none" placeholder="Descripción servicio..."
            v-model="form.descripcionServicio" />
        <InputError :message="form.errors.descripcionServicio" />
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2">
        <div class="grid gap-2 mb-2 md:mb-0">
            <InputLabel class="text-base-more" value="Grafo (Si no agrega un grafo este se pondra como pendiente) *" />
            <TextInput placeholder="Grafo..." v-model="form.grafo" />
            <InputError :message="form.errors.grafo" />
        </div>

        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Consecutivo EC:" />
            <TextInput placeholder="Consecutivo EC..." disabled class="bg-gray-300" v-model="form.consecutivoEC" />
        </div>
    </div>

    <OptionsByPlanos v-if="validIfOptionsContainSomeWordWithPlano" :form="form" />

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Informacion Adjunta (15mb en total):" />

        <TextInput type="file" multiple @change="getFiles" />
    </div>

</template>