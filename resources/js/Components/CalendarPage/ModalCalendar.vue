<template>
    <Transition name="slide-fade">
        <section
            class="border-l right-0 z-50 shadow-lg fixed w-full h-screen top-0 left-0 flex justify-end duration-200"
            v-if="openModal">
            <div class="before:content absolute w-full h-screen top-0 left-0 bg-[#0000003b] opacity-100 z-10 duration-400"
                @click="onCreateEvent"></div>

            <article class="w-[40rem] p-4 bg-white dark:bg-black overflow-auto relative z-50">
                <div class="flex justify-between pb-4 border-b">
                    <h1 class="text-xl font-medium">Crear evento</h1>

                    <button
                        class="w-8 h-8 bg-red-500 text-white rounded-md shadow-md cursor-pointer hover:bg-red-600 duration-300"
                        @click="onCreateEvent">X</button>
                </div>

                <form class="grid gap-4 pt-3" @submit.prevent="onSaveEvent">
                    <div class="grid gap-2">
                        <label class="font-medium">Lugar del evento</label>
                        <select class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                            v-model="form.floor">
                            <option value="">Seleccionar</option>
                            <option value="Laboratorio XRLAB">Laboratorio XRLAB</option>
                        </select>
                    </div>
                    <div class="grid gap-2">
                        <label class="font-medium">Título</label>
                        <TextInput class="w-full" placeholder="Titulo del evento..." v-model="form.title" />
                    </div>
                    <div class="grid gap-2">
                        <label class="font-medium">Tipo de servicio</label>
                        <v-select class="dark:bg-gray-700 rounded-md" :options="listaTipoServicios" label="description"
                            placeholder="Tipo de servicios..." v-model="form.typeService" taggable />
                    </div>
                    <div class="grid gap-2">
                        <label class="font-medium">Descripción</label>
                        <textarea class="w-full h-32 resize-none border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                            placeholder="Describe lo que haran..." v-model="form.description" />
                    </div>
                    <div class="grid grid-cols-5 gap-2">
                        <div class="grid gap-2 col-span-1">
                            <label class="font-medium">Requiere RV</label>
                            <div class="flex gap-3">
                                <label for="realityIcon">
                                    <RealityIcon />
                                </label>
                                <label class="w-max inline-flex items-center cursor-pointer">
                                    <input id="realityIcon" type="checkbox" value="" class="sr-only peer"
                                        v-model="form.isArRequired">
                                    <div
                                        class="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="grid gap-2 col-span-4">
                            <label class="font-medium">Gerencia</label>
                            <select class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                v-model="form.division">
                                <option v-for="management in listManagement" :key="management.Nombre"
                                    :value="management.Nombre">{{ management.Nombre }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div class="grid gap-2">
                            <label class="font-medium">Fecha del evento</label>
                            <VueDatePicker placeholder="25/07/2024" v-model="form.date" :enable-time-picker="false"
                                :min-date="new Date()" :disabled-week-days="[6, 0]" auto-apply
                                :disabled-dates="getAllHolidays()" />
                        </div>
                        <div class="grid gap-2">
                            <label class="font-medium">Hora del evento</label>

                            <div class="w-full h-full border p-1.5 rounded-md shadow-sm border-gray-300 text-gray-300 dark:bg-gray-700 dark:border-none"
                                :class="form.date ? 'cursor-pointer' : 'pointer-events-none'"
                                @click="handleOpenModalHours">
                                <span class="w-full h-full flex cursor-text">{{ form.dateHours.length > 0 ?
                                    `${form.dateHours[0]} - ${form.dateHours[1]}` : "11:00 AM - 12:00 PM..."
                                    }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid gap-2">
                        <label class="font-medium">Participantes necesarios</label>
                        <v-select class="dark:bg-gray-700 rounded-md" multiple :options="usersEmails"
                            placeholder="Participantes..." append-to-body :calculate-position="calcSpacing"
                            v-model="form.participantsNecesary" label="correo" :reduce="email => email.correo"
                            :filter="customFilter">
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
                        <label class="font-medium">Participantes opcionales</label>
                        <v-select class="dark:bg-gray-700 rounded-md" multiple :options="usersEmails"
                            placeholder="Participantes..." label="correo" append-to-body
                            :calculate-position="calcSpacing" v-model="form.participantsOptional"
                            :reduce="email => email.correo" :filter="customFilter">
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
                        <label class="font-medium">recursos</label>
                        <v-select class="dark:bg-gray-700 rounded-md" multiple placeholder="Recursos..." :options="[]"
                            v-model="form.resource" taggable />
                    </div>

                    <button
                        class=" w-full py-2 mt-4 bg-primary-cotecmar text-white rounded-md shadow-md cursor-pointer hover:bg-tertiary-cotecmar duration-300"
                        type="submit">{{ isLoadingSaveEvent ? 'Guardando evento...' : 'Guardar' }}</button>
                </form>
            </article>
        </section>
    </transition>

    <ModalHoursEvent v-if="form.date" :events="events" :open-modal-hours="openModalHours"
        :handle-open-modal-hours="handleOpenModalHours" :form="form" />
</template>

<script setup>
import TextInput from '@/Components/TextInput.vue';
import ModalHoursEvent from './ModalHoursEvent.vue';
import { getAllHolidays } from '@/Data/getHolidays';
import { useModalCalendar } from '@/Composables';
import RealityIcon from '@/Assets/RealityIcon.vue';
import Fuse from 'fuse.js';

const props = defineProps({
    openModal: Boolean,
    onCreateEvent: Function,
    form: Object,
    onSaveEvent: Function,
    openModalHours: Boolean,
    handleOpenModalHours: Function,
    events: Array,
    isLoadingSaveEvent: Boolean,
});

const { calcSpacing, listaTipoServicios, usersEmails, listManagement } = useModalCalendar(props.form)

function customFilter(options, search) {
    const fuse = new Fuse(options, {
        keys: ['nombre', 'correo'],
        shouldSort: true,
        threshold: 0,
        distance: 100,
    });

    return search.length
        ? fuse.search(search).map(({ item }) => item)
        : options;
}

</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(50px);
    opacity: 0;
}
</style>