<template>

    <AppLayout title="Agregar grafos">

        <section class="overflow-auto">
            <HeaderTableExcel :data-excel="dataExcel" :handle-file-change="handleFileChange" :file="file"
                :loading-file="loadingFile" :on-load-save-excel="onLoadSaveExcel"
                :somebody-excel-edit="somebodyExcelEdit" />

            <article class="p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="text-center">
                            <th scope="col" class="px-6 py-3">Grafo_OP</th>
                            <th scope="col" class="px-6 py-3">Proyecto</th>
                            <th scope="col" class="px-6 py-3">
                                Operación_Proceso
                            </th>
                            <th scope="col" class="px-6 py-3">Codigo_SAP</th>
                            <th scope="col" class="px-6 py-3">Fase</th>
                            <th scope="col" class="px-6 py-3">SWBS</th>
                            <th scope="col" class="px-6 py-3">Estado</th>
                            <th scope="col" class="px-6 py-3">Bloque</th>
                            <th scope="col" class="px-6 py-3">Caso</th>
                            <th scope="col" class="px-6 py-3">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                            v-for="(row, index) in paginatedData" :key="index">

                            <ItemsTableExcel :row="row" :start-editing="startEditing"
                                v-on:delete-graph-select="onDeleteGraphSelect" />
                        </tr>
                    </tbody>
                </table>

                <FormOneSelectExcel :project-select-to-edit="projectSelectToEdit" :start-editing="startEditing"
                    :show-modal-form="showModalForm" v-on:update-graph-select="onUpdateGraphSelect" />

                <PaginationPersonnel :project-select="dataExcel.dataExcelSelect" :pagination="currentPage"
                    @changePage="changePage" :total-pages="totalPages" />

                <Paginator :rows="rowsPerPage" :totalRecords="listaDataDeliverables.length"
                    :first="currentPage * rowsPerPage" :rowsPerPageOptions="[10, 20, 30]" @page="onPageChange" />
            </article>
        </section>
    </AppLayout>
</template>

<script setup>
import HeaderTableExcel from "@/Components/Personnel/HeaderTableExcel.vue";
import ItemsTableExcel from "@/Components/Personnel/ItemsTableExcel.vue";
import { useAddExcelFile } from "@/Composables/useAddExcelFile";
import FormOneSelectExcel from "@/Components/Personnel/FormOneSelectExcel.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import Paginator from "primevue/paginator";

const {
    currentPage,
    dataExcel,
    file,
    itemsPerPage,
    loadingFile,
    paginatedData,
    showModalForm,
    projectSelectToEdit,
    somebodyExcelEdit,
    totalPages,
    changePage,
    onLoadSaveExcel,
    handleFileChange,
    onUpdateGraphSelect,
    onDeleteGraphSelect,
    startEditing,
} = useAddExcelFile();

</script>
