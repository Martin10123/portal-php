<template>
    <caption
        class="px-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        <div class="flex justify-between pb-4 dark:py-2">
            <div class="flex gap-2 items-center">
                <p class="text-sm font-normal text-gray-500 cursor-pointer" @click="clearValues(1)">Home</p>
                <p class="text-sm font-normal text-gray-500 cursor-pointer" @click="clearValues(2)" v-if="valueProject">
                    > {{ valueProject.Proyecto }}</p>
                <p class="text-sm font-normal text-gray-500 cursor-pointer" v-if="selectedStage" @click="clearValues(3)">> {{ selectedStage }}
                </p>
                <p class="text-sm font-normal text-gray-500 cursor-pointer" v-if="selectedSwbs">
                    > {{ selectedSwbs }}</p>
            </div>

            <div class="flex items-center gap-2">
                <Link href="/Sigedin/Personnel/AddGraphoFromExcel">
                    <AddIcon classE="w-5 h-5 cursor-pointer" />
                </Link>
                <EditIcon classE="w-5 h-5 cursor-pointer" @click="startEditing" />
            </div>
        </div>
    </caption>
</template>

<script setup>
import AddIcon from '@/Assets/AddIcon.vue';
import EditIcon from '@/Assets/EditIcon.vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    projectSelect: Array,
    startEditing: Function,
    selectedStage: String,
    selectedSwbs: String,
    valueProject: Object,
    clearValues: Function,
})

</script>