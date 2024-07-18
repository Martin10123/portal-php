<template>
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between p-2 px-6"
        aria-label="Table navigation">
        <span
            class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Página
            <span class="font-semibold text-gray-900 dark:text-white">{{ pagination }}</span>
            de
            <span class="font-semibold text-gray-900 dark:text-white">{{ totalPages }}</span>
        </span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <button :disabled="pagination === 1" @click="changePage(pagination - 1)"
                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                    Previous
                </button>
            </li>
            <li v-for="page in totalPages" :key="page">
                <button @click="changePage(page)"
                    :class="{ 'bg-blue-500 text-white': pagination === page, 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700': pagination !== page }"
                    class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300">
                    {{ page }}
                </button>
            </li>
            <li>
                <button :disabled="pagination === totalPages" @click="changePage(pagination + 1)"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                    Next
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    projectSelect: Array,
    pagination: Number
})

const totalPages = ref(1)

const emit = defineEmits(['changePage'])

watchEffect(() => {
    totalPages.value = Math.ceil(props.projectSelect.length / 10)
})

function changePage(page) {
    emit('changePage', page)
}
</script>
