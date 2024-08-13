<template>
    <ol class="bg-white dark:bg-transparent mt-2 rounded-lg flex">
        <li class="flex w-full items-center text-blue-600 before:content-[''] before:w-full before:h-1 before:border-b before:border-4 before:inline-block"
            :class="{ 'before:border-blue-200': tabs >= 1 }">
            <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 shrink-0"
                :class="{ 'bg-blue-100': tabs >= 1 }">
                <i class="fa-solid fa-diagram-project" v-if="tabs == 1"></i>
                <i class="fa-solid fa-check" v-if="tabs >= 2"></i>
            </span>
        </li>

        <li class="flex w-full items-center before:content-[''] before:w-full before:h-1 before:border-b  before:border-4 before:inline-block"
            :class="{ 'before:border-blue-200': tabs >= 2 }">
            <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0"
                :class="{ 'bg-blue-200': tabs >= 2 }">
                <i class="fa-solid fa-id-card text-xl" v-if="tabs >= 1"></i>
            </span>
        </li>
    </ol>
</template>

<script setup>

const { tabs } = defineProps({
    tabs: Number,
});

</script>