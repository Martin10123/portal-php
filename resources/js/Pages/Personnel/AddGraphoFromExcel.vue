<template>
    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">
        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section>
            <div class="p-4">
            <h1 class="text-2xl pb-4">Subir grafos desde tu archivo excel</h1>

            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click para
                                cargar archivo</span></p>
                        <p class="text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ file ? file.name : 'No has seleccionado ningun archivo' }}
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" accept=".xls,.xlsx"
                        @change="handleFileChange" />
                </label>
            </div>

            <button
                class="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                :class="{ 'cursor-not-allowed': loadingFile }" @click="onLoadSaveExcel" :disabled="loadingFile">
                {{ loadingFile ? 'Cargando...' : 'Cargar archivo' }}
            </button>
        </div>
        </section>
    </main>
</template>

<script setup>
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useReports } from '@/Composables';
import { ref } from 'vue';
import Swal from 'sweetalert2';
// import readXlsxFile from 'read-excel-file';

defineProps({
    showAddExcelBD: Boolean,
    handleModalExcelDB: Function
})

const {
    openSidebar,
    toggleOpenSidebar,
} = useReports()

const file = ref(null);
const loadingFile = ref(false);

const handleFileChange = async(e) => {
    file.value = e.target.files[0];
    // try {

    //     const data = await readXlsxFile(file.value);

    //     console.log(data);
    // } catch (error) {
    //     console.log(error);
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Ocurrió un error al leer el archivo excel',
    //     });
    // }
}

const onLoadSaveExcel = async () => {

    if (file.value === null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes seleccionar un archivo excel',
        });
        return;
    }

    try {

        loadingFile.value = true;

        const formData = new FormData();
        formData.append('file', file.value);

        const response = await axios.post(route("reports.importExcel"), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Archivo cargado',
                text: response.data.message,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message,
            });
        }

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al cargar el archivo',
        });
    } finally {
        loadingFile.value = false;
    }
}

</script>