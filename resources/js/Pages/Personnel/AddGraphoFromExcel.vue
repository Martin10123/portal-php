<template>
    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">
        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section class="overflow-auto">
            <HeaderTableExcel :data-excel="dataExcel" :handle-file-change="handleFileChange" :file="file"
                :loading-file="loadingFile" :on-load-save-excel="onLoadSaveExcel"
                :somebody-excel-edit="somebodyExcelEdit" :loading-excel="loadingExcel" />

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
                    @changePage="changePage" />
            </article>
        </section>
    </main>
</template>

<script setup>
import Navbar from "@/Components/SideBar/Navbar.vue";
import SideBarMain from "@/Components/SideBar/SideBarMain.vue";
import PaginationPersonnel from "@/Components/Personnel/PaginationPersonnel.vue";
import HeaderTableExcel from "@/Components/Personnel/HeaderTableExcel.vue";
import ItemsTableExcel from "@/Components/Personnel/ItemsTableExcel.vue";
import { useAddExcelFile } from "@/Composables/useAddExcelFile";
import FormOneSelectExcel from "@/Components/Personnel/FormOneSelectExcel.vue";

const {
    currentPage,
    dataExcel,
    file,
    itemsPerPage,
    loadingFile,
    openSidebar,
    paginatedData,
    showModalForm,
    projectSelectToEdit,
    loadingExcel,
    somebodyExcelEdit,
    changePage,
    onLoadSaveExcel,
    handleFileChange,
    onUpdateGraphSelect,
    toggleOpenSidebar,
    onDeleteGraphSelect,
    startEditing,
} = useAddExcelFile();

</script>
