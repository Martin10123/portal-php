<template>
    <div class="grid gap-2">
        <label class="font-medium">{{ label }}</label>
        <v-select class="dark:bg-gray-700 rounded-md" multiple :options="options" placeholder="Participantes..."
            append-to-body :calculate-position="calcSpacing" label="correo" :filter="customFilter"
            :reduce="email => email.correo" v-model="localValue" taggable>
            <template v-slot:option="option">
                <div>
                    {{ option.correo }}
                    <br />
                    <cite class="text-sm">{{ option.nombre }}</cite>
                </div>
            </template>
        </v-select>
    </div>
</template>

<script setup>
import Fuse from 'fuse.js';
import { ref, watch } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
    modelValue: Array,
    label: String,
    options: Array,
    calcSpacing: Function,
});

const emit = defineEmits();

// Crear una referencia local para v-model
const localValue = ref(props.modelValue);

// Emitir el valor actualizado cuando localValue cambie
watch(localValue, (newValue) => {
    emit('update:modelValue', newValue);
});

function customFilter(options, search) {
    const fuse = new Fuse(options, {
        keys: ['nombre', 'correo'],
        shouldSort: true,
        threshold: 0.2,
        distance: 200,
    });

    return search.length
        ? fuse.search(search).map(({ item }) => item)
        : options;
}
</script>
