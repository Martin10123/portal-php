<template>
    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Armador" />
            <TextInput placeholder="Armador..." v-model="form.armador" />
        </div>

        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Casa clasificadora" />
            <TextInput placeholder="Casa clasificadora..." v-model="form.casaClasificadora" />
        </div>
    </div>

    <div class="scmid995:grid scmid995:grid-cols-2 scmid995:gap-2">
        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Número IMO" />
            <TextInput placeholder="Número IMO..." v-model="form.numeroIMO" />
        </div>

        <div class="grid gap-2">
            <InputLabel class="text-base-more" value="Inspector de campo" />
            <TextInput placeholder="Inspector de campo..." v-model="form.inspectorCampo" />
        </div>
    </div>

    <div class="grid gap-2">
        <InputLabel class="text-base-more" value="Gerente del proyecto" />
        <textarea class="border rounded-lg border-stone-300 h-20" placeholder="Gerente del proyecto..."
            v-model="form.gerenteProyecto" />
    </div>
</template>

<script setup>
import TextInput from '@/Components/TextInput.vue';
import InputLabel from '@/Components/InputLabel.vue';

defineProps({
    form: Object,
})
</script>