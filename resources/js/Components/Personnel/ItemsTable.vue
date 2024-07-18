<template>
    <td class="w-4 p-4">
        <div class="flex items-center ">
            <input id="checkbox-table-search-3" type="checkbox" :checked="project.selected"
                @click="onCheckProject(project)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
        </div>
    </td>
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {{ project.Operación_Proceso }}</td>
    <td class="px-6 py-4">{{ project.SWBS }}</td>
    <td class="px-6 py-4">{{ project.Fase }}</td>
    <td class="px-6 py-4">{{ project.Grafo_OP }}</td>
    <td class="px-6 py-4">{{ project.Bloque || "N/A" }}</td>
    <td class="px-6 py-4">{{ project.Estado }}</td>
</template>

<script setup>

defineProps({
    project: Object,
    onCheckProject: Function
})

</script>