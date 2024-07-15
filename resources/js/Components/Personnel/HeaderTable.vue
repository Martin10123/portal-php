<template>
    <caption
        class="px-5 pb-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        <div class="flex justify-between pb-4">
            <p class="text-sm font-normal text-gray-500">Home > {{ projectSelect[0]?.Proyecto }}</p>

            <EditIcon class="w-5 h-5 cursor-pointer" @click="startEditing" />
        </div>
        <div class="flex gap-4 items-center justify-between">
            <p class="mt-1 text-sm font-semibold dark:text-gray-400" v-show="projectSelect[0]?.Caso">
                [{{ projectSelect[0]?.Caso }}] - {{ projectSelect[0]?.Proyecto }}
            </p>
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400" v-show="projectSelect[0]?.Codigo_SAP">
                CODIGO SAP: {{ projectSelect[0]?.Codigo_SAP }}</p>
        </div>
    </caption>
</template>

<script setup>
import EditIcon from '@/Assets/EditIcon.vue';

defineProps({
    projectSelect: Array,
    startEditing: Function,
})

</script>