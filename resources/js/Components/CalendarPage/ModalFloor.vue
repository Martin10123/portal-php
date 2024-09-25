<template>
    <Transition name="slide-fade">
        <section
            class="border-l right-0 z-50 shadow-lg fixed w-full h-screen top-0 left-0 flex duration-200 justify-center items-center"
            v-if="openModal">
            <div class="before:inset-0 before:absolute before:bg-black before:opacity-50 before:-z-10 before:duration-200"
                @click="toggleModal"></div>
            <div class="bg-white shadow-lg rounded-lg min-w-96 max-w-[28rem]">
                <div class="border-b flex items-center justify-between p-4">
                    <h1 class="text-2xl font-medium text-center text-gray-800 border-gray-200">
                        {{ isEditing ? 'Editar Sala' : 'Agregar Sala' }}
                    </h1>
                    <button class="p-1 rounded text-gray-800 hover:text-gray-600 duration-300 bg-slate-300"
                        @click="toggleModal">
                        X
                    </button>
                </div>

                <div class="p-4">
                    <form class="grid gap-3" @submit.prevent="save">
                        <div class="grid gap-2">
                            <label for="floorName" class="w-max block text-lg font-medium text-gray-700">
                                Nombre de la sala ({{ form.color?.name || "" }})
                            </label>
                            <TextInput class="w-full" id="floorName" placeholder="Nombre de la sala"
                                v-model="form.floorName" />
                            <InputError :message="form.errors.floorName" />
                        </div>
                        <div class="flex gap-4 justify-between">
                            <div class="cursor-pointer flex gap-2 duration-300" v-for="color in listColors"
                                :key="color.valueC" @click="selectColor(color)" :class="{
                                    '-translate-y-2': form.color?.name === color.name,
                                }">
                                <div class="w-7 h-7 rounded" :style="{ background: color.valueC }"></div>
                            </div>
                        </div>
                        <InputError :message="form.errors.color" />
                        <div class="grid gap-2">
                            <label for="floorAlias" class="w-max block text-lg font-medium text-gray-700">Alias de la
                                sala</label>
                            <TextInput class="w-full" id="floorAlias" placeholder="Alias de la sala"
                                v-model="form.floorAlias" />
                            <InputError :message="form.errors.floorAlias" />
                        </div>
                        <div class="grid gap-2">
                            <label for="floorRespo"
                                class="w-max block text-lg font-medium text-gray-700">Encargados</label>
                            <v-select id="floorRespo" v-model="form.responsables"
                                placeholder="Seleccione a los encargados de esta sala" :options="listResponsables"
                                label="nombre" multiple />
                            <InputError :message="form.errors.responsables" />
                        </div>

                        <div class="grid gap-2" v-if="isEditing">
                            <label for="floorRespo" class="w-max block text-lg font-medium text-gray-700">Estado</label>
                            <label class="inline-flex items-center cursor-pointer w-max">
                                <input id="floorRespo" type="checkbox" v-model="form.floorState" class="sr-only peer">
                                <div
                                    class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sala {{
                                    form.floorState ? 'Activa' : 'Inactiva' }}</span>
                            </label>
                        </div>

                        <div>
                            <button
                                class="w-full py-2 mt-4 bg-primary-cotecmar text-white rounded-md shadow-md cursor-pointer hover:bg-tertiary-cotecmar duration-300"
                                type="submit">
                                {{ isEditing ? 'Guardar Cambios' : 'Guardar Sala' }}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    </Transition>
</template>

<script setup>

import TextInput from "../TextInput.vue";
import InputError from "../InputError.vue";
import { useModalFloor } from "@/Composables";

const props = defineProps({
    openModal: Boolean,
    toggleModal: Function,
    isEditing: Boolean,
    sala: Object,
});

const emit = defineEmits(["addFloor", "updateFloor"]);

const {
    form,
    listColors,
    listResponsables,
    selectColor,
    save,
} = useModalFloor({
    emit,
    props
})

</script>
