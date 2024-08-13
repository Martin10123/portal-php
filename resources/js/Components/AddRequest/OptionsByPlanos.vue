<template>
    <div class="grid scmid995:grid-cols-2 gap-2">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Armador" />
            <TextInput placeholder="Armador..." v-model="form.armador" />
            <InputError :message="form.errors.armador" />
        </div>

        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Casa clasificadora" />
            <TextInput placeholder="Casa clasificadora..." v-model="form.casaClasificadora" />
            <InputError :message="form.errors.casaClasificadora" />
        </div>
    </div>

    <div class="grid scmid995:grid-cols-2 gap-2">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Número IMO" />
            <TextInput type="number" placeholder="Número IMO..." v-model="form.numeroIMO" />
            <InputError :message="form.errors.numeroIMO" />
        </div>

        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Inspector de campo" />
            <TextInput placeholder="Inspector de campo..." v-model="form.inspectorCampo" />
            <InputError :message="form.errors.inspectorCampo" />
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Gerente del proyecto" />
        <textarea class="border rounded-lg border-stone-300 h-20 resize-none dark:bg-gray-700 dark:text-white" placeholder="Gerente del proyecto..."
            v-model="form.gerenteProyecto" />
        <InputError :message="form.errors.gerenteProyecto" />
    </div>
</template>

<script setup>
import TextInput from '@/Components/TextInput.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '../InputError.vue';

defineProps({
    form: Object,
})
</script>