<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import Applicant from './Applicant.vue';
</script>

<template>
    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Pendiente:" />
        <TextInput placeholder="Pendiente..." type=checkbox />
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Tipo de copia:" />
            <select class="border border-stone-300 rounded-lg bg-gray-300" disabled>
                <option value="******">******</option>
            </select>
        </div>
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Fecha de solución (Días háblies):" />
            <TextInput type="date" />
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Solicitud generada por:" />
        <TextInput placeholder="Solicitud generada por..." />
    </div>

    <Applicant />
</template>