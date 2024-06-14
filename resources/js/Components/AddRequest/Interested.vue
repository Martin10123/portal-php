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
    getFileById
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

    <p @click="getFileById(1)">aaaa</p>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Informacion Adjunta (15mb en total):" />
        <div class="flex items-center justify-center w-full">
            <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Selecciona uno
                            o varios archivos</span></p>
                    <p class="text-xs text-gray-500">(MAX. 15mb)</p>
                </div>
                <input id="dropzone-file" multiple type="file" class="hidden" @change="getFiles"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" />
            </label>
        </div>
    </div>
</template>