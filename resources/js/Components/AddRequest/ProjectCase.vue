<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import Multiselect from 'vue-multiselect';
import { ref } from 'vue';

const books = ref([
    { title: 'Don Quixote', author: 'Miguel de Cervantes' },
    { title: 'Ulysses', author: 'James Joyce' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
])
</script>

<template>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Caso" />
        <TextInput placeholder="8000..." />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Proyecto" />
        <TextInput placeholder="Proyecto..." />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Tipo de buque" />
        <TextInput placeholder="Tipo de buque..." />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Planta" />
        <TextInput placeholder="Planta..." />
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Cliente externo" />
        <Multiselect class="p-2 rounded-md border-2" :options="books" track-by="title" label="title" />
    </div>
</template>