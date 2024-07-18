<template>
    <caption
        class="px-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        <div class="flex justify-between pb-4">
            <div class="flex gap-2 items-center">
                <p class="text-sm font-normal text-gray-500 cursor-pointer" @click="clearValues(1)">Home</p>
                <p class="text-sm font-normal text-gray-500 cursor-pointer" @click="clearValues(2)" v-if="valueProject">
                    > {{
                        valueProject.Proyecto }}</p>
                <p class="text-sm font-normal text-gray-500 cursor-pointer" @click="clearValues(3)" v-if="selectedSwbs">
                    > {{ selectedSwbs }}</p>
                <p class="text-sm font-normal text-gray-500 cursor-pointer" v-if="selectedStage">> {{ selectedStage }}
                </p>
            </div>

            <EditIcon class="w-5 h-5 cursor-pointer" @click="startEditing" />
        </div>
    </caption>
</template>

<script setup>
import EditIcon from '@/Assets/EditIcon.vue';

const props = defineProps({
    projectSelect: Array,
    startEditing: Function,
    selectedStage: String,
    selectedSwbs: String,
    valueProject: Object,
    clearValues: Function,
})

</script>