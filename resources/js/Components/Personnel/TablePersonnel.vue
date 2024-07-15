<script setup>
import EditIcon from '@/Assets/EditIcon.vue';
import TextInput from '../TextInput.vue';
import PaginationPersonnel from './PaginationPersonnel.vue';
import HeaderTable from './HeaderTable.vue';
import { computed } from 'vue';

const props = defineProps({
    projectSelect: Array
})

const projectsWithEditing = computed(() => {
    return props.projectSelect.map(project => ({
        ...project,
        editing: false
    }));
});

const onCheckAllProjects = (event) => {
    projectsWithEditing.value.forEach(project => {
        project.editing = event.target.checked;
    });
};

const onCheckProject = (project) => {
    projectsWithEditing.value.forEach(p => {
        if (p.Id === project.Id) {
            p.editing = !p.editing;
        }
    });
};

const startEditing = (ids) => {

};

const saveEdit = (ids) => {
};
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <HeaderTable :project-select="projectSelect" :start-editing="startEditing" />

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-3" type="checkbox" @click="onCheckAllProjects"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">Operación proceso</th>
                    <th scope="col" class="px-6 py-3">SWBS</th>
                    <th scope="col" class="px-6 py-3">Fase</th>
                    <th scope="col" class="px-6 py-3">Grafo</th>
                    <th scope="col" class="px-6 py-3">Bloque</th>
                    <th scope="col" class="px-6 py-3">Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(project, index) in projectsWithEditing" :key="project.Id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                    <template v-if="project.editing">
                        <td class="px-4 py-2">
                        </td>
                        <td class="px-4 py-2">
                            <TextInput v-model="project.Operación_Proceso" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                            <select v-model="project.SWBS"
                                class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer">
                                <option value="000">000</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="600">600</option>
                                <option value="700">700</option>
                                <option value="800">800</option>
                            </select>
                        </td>
                        <td class="px-4 py-2">
                            <TextInput v-model="project.Fase" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                            <TextInput v-model="project.Grafo_OP" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                            <TextInput v-model="project.Bloque" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                            <select v-model="project.Estado"
                                class="w-full border-gray-300 rounded-md shadow-sm cursor-pointer">
                                <option value="Inactivo">Inactivo</option>
                                <option value="Activo">Activo</option>
                            </select>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button @click="saveEdit(index)" class="text-blue-600 hover:text-blue-900">Guardar</button>
                        </td>
                    </template>
                    <template v-else>
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-3" type="checkbox" @click="onCheckProject(project)"
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
                </tr>
            </tbody>
        </table>

        <PaginationPersonnel :project-select="projectSelect" />
    </div>
</template>
