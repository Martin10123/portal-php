import { useReports } from "./useReports";
import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import readXlsxFile from "read-excel-file";
import { useDataGrafosStore } from "@/pinia/useDataStore";

export const useAddExcelFile = () => {
    const { openSidebar, toggleOpenSidebar } = useReports();
    const dataGrafos = useDataGrafosStore();

    const file = ref(null);
    const projectSelectToEdit = ref(null);
    const showModalForm = ref(false);
    const somebodyExcelEdit = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const loadingFile = ref({
        loadingExcel: false,
        loadingSave: false,
    });
    const dataExcel = ref({
        dataExcelSelect: [],
        rowsCount: 0,
    });

    const handleFileChange = (e) => {
        file.value = e.target.files[0];

        loadingFile.value.loadingExcel = true;

        try {
            readXlsxFile(file.value)
                .then((rows) => {
                    convertExcelToJson(rows);
                })
                .catch((error) => {
                    handleError(error, "error");
                });
        } catch (error) {
            handleError(error, "error");
        } finally {
            loadingFile.value.loadingExcel = false;
        }
    };

    const convertExcelToJson = (data) => {
        const [header, ...rows] = data;

        dataExcel.value.rowsCount = rows.length;

        dataExcel.value.dataExcelSelect = rows.map((row) => {
            const [
                ,
                grafo_op = "-",
                proyecto = "-",
                codigo_sap = "-",
                fase = "-",
                swbs = "-",
                operacion_proceso = "-",
                Id_Actividad,
                estado = "-",
                bloque = "-",
                caso = "-",
            ] = row;

            return {
                id: Math.floor(Math.random() * 5000) + 1,
                grafo_op,
                proyecto,
                codigo_sap,
                fase,
                swbs,
                operacion_proceso,
                Id_Actividad,
                estado,
                bloque: bloque ?? "-",
                caso,
            };
        });
    };

    const handleError = (error, icon) => {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al leer el archivo. Asegúrese de que sea un archivo Excel válido.",
            icon: icon,
            confirmButtonText: "OK",
        });
    };

    const paginatedData = computed(() => {
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        return dataExcel.value.dataExcelSelect.slice(
            startIndex,
            startIndex + itemsPerPage
        );
    });

    const changePage = (page) => {
        currentPage.value = page;
    };

    const startEditing = (dataGrafo) => {
        if (!dataGrafo) {
            showModalForm.value = false;
            projectSelectToEdit.value = null;
            return;
        }

        projectSelectToEdit.value = {
            ...dataGrafo,
            caso: dataGrafo.caso.toString(),
        };
        showModalForm.value = true;
    };

    const onLoadSaveExcel = async () => {
        if (file.value === null) {
            Swal.fire({
                title: "Archivo no seleccionado",
                text: "Por favor, seleccione un archivo antes de continuar.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        if (dataExcel.value.dataExcelSelect.length === 0) {
            Swal.fire({
                title: "Archivo vacío",
                text: "No se encontraron datos en el archivo seleccionado.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        if (somebodyExcelEdit.value) {
            Swal.fire({
                title: "Guardar cambios",
                text: "¿Desea guardar los cambios realizados en el archivo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
            }).then((result) => {
                if (result.isConfirmed) {
                    onAddGraphSelects();
                }
            });

            return;
        }

        try {
            loadingFile.value.loadingSave = true;

            const formData = new FormData();
            formData.append("file", file.value);
            const response = await axios.post(
                route("reports.importExcel"),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Archivo cargado",
                    text: `${response.data.rowCount} archivos cargados correctamente`,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error al cargar el archivo",
            });
        } finally {
            loadingFile.value.loadingSave = false;
        }
    };

    const onAddGraphSelects = async () => {
        loadingFile.value.loadingSave = true;

        try {
            const response = await axios.post(route("reports.addGraph"), {
                reports: dataExcel.value.dataExcelSelect,
            });

            if (response.data.success) {
                Swal.fire({
                    title: "Éxito",
                    text: `Se han guardado los cambios correctamente. Se guardaron ${response.data.allGraphsUpdated.length} registros. ${response.data.graphNotSaved} registros no se guardaron porque ya existian.`,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                somebodyExcelEdit.value = false;
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al agregar el grafo. Asegúrese de que los campos sean validos.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al agregar el grafo. Asegúrese de que los campos sean validos.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            showModalForm.value = false;
            projectSelectToEdit.value = null;
            dataExcel.value.dataExcelSelect = [];
            file.value = null;
            dataExcel.value.rowsCount = 0;
            loadingFile.value.loadingSave = true;
        }
    };

    const onUpdateGraphSelect = async (form) => {
        try {
            dataExcel.value.dataExcelSelect =
                dataExcel.value.dataExcelSelect.map((dataGrafo) => {
                    if (dataGrafo.id === form.id) {
                        return {
                            ...form,
                            caso: form.caso.toString(),
                            estado: form.estado ? "Activo" : "Inactivo",
                        };
                    }

                    return dataGrafo;
                });

            somebodyExcelEdit.value = true;
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al agregar el grafo. Asegúrese de que los campos sean validos.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            showModalForm.value = false;
            projectSelectToEdit.value = null;
        }
    };

    const onDeleteGraphSelect = async (graphS) => {
        try {
            dataExcel.value.dataExcelSelect =
                dataExcel.value.dataExcelSelect.filter(
                    (dataGrafo) => dataGrafo.id !== graphS.id
                );

            dataExcel.value.rowsCount = dataExcel.value.dataExcelSelect.length;
            somebodyExcelEdit.value = true;
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el grafo. Asegúrese de que los campos sean validos.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            projectSelectToEdit.value = null;
        }
    };

    const getAllInfoPersonnelStore = async () => {
        try {
            await dataGrafos.getAllInfoPersonnel();
        } catch (error) {
            console.log(error);
        }
    };

    onMounted(() => {
        getAllInfoPersonnelStore();
    });

    return {
        file,
        loadingFile: loadingFile.value.loadingSave,
        loadingExcel: loadingFile.value.loadingExcel,
        dataExcel,
        currentPage,
        itemsPerPage,
        paginatedData,
        openSidebar,
        dataGrafos,
        showModalForm,
        projectSelectToEdit,
        somebodyExcelEdit,
        handleFileChange,
        changePage,
        onLoadSaveExcel,
        toggleOpenSidebar,
        startEditing,
        onUpdateGraphSelect,
        onDeleteGraphSelect,
    };
};
