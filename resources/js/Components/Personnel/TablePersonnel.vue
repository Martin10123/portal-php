<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <HeaderTable :project-select="projectSelect" :start-editing="startEditing" :selected-stage="selectedStage"
                :selected-swbs="selectedSwbs" :value-project="valueProject" :clear-values="clearValues" />

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-3" type="checkbox" v-model="checkAllProjects"
                                @click="onCheckAllProjects"
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
                    <th scope="col" class="px-6 py-3" v-if="showOnlyOne"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(project) in paginatedProjects" :key="project.Id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-transparent">

                    <FormOneSelect v-if="showOnlyOne && project.selected" :selected-project="selectedProject"
                        :on-cancel-edit="onCancelEdit" :on-update-project-selected="onUpdateProjectSelected" />

                    <ItemsTable v-else :project="project" :on-check-project="onCheckProject" />
                </tr>
                <tr v-if="paginatedProjects.length == 0">
                    <td class="px-6 py-4 text-center" colspan="8">No hay registros</td>
                </tr>
            </tbody>
        </table>

        <PaginationPersonnel :project-select="projectSelect" :pagination="pagination" @change-page="onChangePage" />

        <FormSelects :show-modal-form="showModalForm" :handle-modal-form="handleModalForm"
            :selected-project="selectedProject" :on-update-project-selected="onUpdateProjectSelected" />
    </div>
</template>

<script setup>
import PaginationPersonnel from './PaginationPersonnel.vue';
import HeaderTable from './HeaderTable.vue';
import FormSelects from './FormSelects.vue';
import { useTablePersonnel } from '@/Composables';
import FormOneSelect from './FormOneSelect.vue';
import ItemsTable from './ItemsTable.vue';

const props = defineProps({
    projectSelect: Array,
    selectedStage: String,
    selectedSwbs: String,
    valueProject: Object,
    clearValues: Function,
})

const {
    handleModalForm,
    onCheckAllProjects,
    onCheckProject,
    selectedProject,
    showModalForm,
    startEditing,
    showOnlyOne,
    paginatedProjects,
    checkAllProjects,
    onCancelEdit, onUpdateProjectSelected,
    onChangePage, pagination
} = useTablePersonnel({ props })

</script>