<script setup>
import { useForm } from '@inertiajs/vue3';

const form = useForm({})

const goToBarChart = () => {
    form.get(route('BarChart'));
};

</script>

<template>
    <div class="flex justify-between items-center">
        <h1 class="text-3xl">Charts</h1>

        <ul class="flex gap-3">
            <li class="relative group" @click="goToBarChart">
                <img class="w-11 h-11 cursor-pointer shadow-md p-2 rounded-xl hover:scale-125 duration-200 dark:bg-white"
                    src="../../Assets/chartBar.svg" alt="chartBar" />
                <div
                    class="absolute bottom-full mb-2 left-1/2 transform z-50 -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Bar Chart
                </div>
            </li>
            <li class="relative group">
                <img class="w-11 h-11 cursor-pointer shadow-md p-2 rounded-xl hover:scale-125 duration-200 dark:bg-white"
                    src="../../Assets/chartLine.svg" alt="chartLine" />
                <div
                    class="absolute bottom-full mb-2 left-1/2 transform z-50 -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Line Chart
                </div>
            </li>
            <li class="relative group">
                <img class="w-11 h-11 cursor-pointer shadow-md p-2 rounded-xl hover:scale-125 duration-200 dark:bg-white"
                    src="../../Assets/chartPie.svg" alt="chartPie" />
                <div
                    class="absolute bottom-full mb-2 left-1/2 transform z-50 -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Pie Chart
                </div>
            </li>
            <li class="relative group">
                <img class="w-11 h-11 cursor-pointer shadow-md p-2 rounded-xl hover:scale-125 duration-200 dark:bg-white"
                    src="../../Assets/charts.svg" alt="charts" />
                <div
                    class="absolute bottom-full mb-2 left-1/2 transform z-50 -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Multiple Charts
                </div>
            </li>
            <li class="relative group">
                <img class="w-11 h-11 cursor-pointer shadow-md p-2 rounded-xl hover:scale-125 duration-200 dark:bg-white"
                    src="../../Assets/chartWaterfall.svg" alt="chartWaterfall" />
                <div
                    class="absolute bottom-full mb-2 left-1/2 transform z-50 -translate-x-[75%] bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Waterfall Chart
                </div>
            </li>
        </ul>
    </div>
</template>
