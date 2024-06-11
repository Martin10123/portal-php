<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { getAllHolidays } from '@/Data/getHolidays';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { ref } from 'vue';

const { form } = defineProps({
    form: Object,
})

const { props } = usePage();

const userActive = ref(props.auth.user);
const disabledDatesHolidays = computed(() => {
    return getAllHolidays()
})

const startDateByTrespuesta = computed(() => {
    return new Date(new Date().setDate(new Date().getDate() + Number(form.servicioSolicitado.trespuesta)))
})

const getFiles = (e) => {

    const files = e.target.files;

    let totalSize = 0;

    for (let i = 0; i < files.length; i++) {
        totalSize += files[i].size;
    }

    if (totalSize > 15728640) {
        alert('El tamaño total de los archivos no puede superar los 15mb');
        return;
    }

}

</script>

<template>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Pendiente:" />
        <TextInput placeholder="Pendiente..." type="checkbox" v-model="form.pendiente" />
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de copia:" />
            <select class="border border-stone-300 rounded-lg bg-gray-300" disabled v-model="form.tipoCopia">
                <option value="******">******</option>
            </select>
        </div>
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Fecha de solución (Días háblies):" />
            <VueDatePicker v-model="form.fechaSolucion" auto-apply placeholder="Fecha de solución..."
                :disabled-week-days="[6, 0]" :min-date="startDateByTrespuesta"
                :disabled-dates="disabledDatesHolidays" />
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Solicitud generada por:" />
        <TextInput class="bg-gray-300" disabled placeholder="Solicitud generada por..." v-model="userActive.name" />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Consecutivo EC:" />
        <TextInput placeholder="Consecutivo EC..." disabled class="bg-gray-300" v-model="form.consecutivoEC" />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Descripción servicio:" />
        <textarea class="border rounded-lg border-stone-300 h-20" placeholder="Descripción servicio..."
            v-model="form.descripcionServicio" />
    </div>
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