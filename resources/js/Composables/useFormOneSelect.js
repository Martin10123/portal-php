import { useDataGrafosStore } from "@/pinia/useDataStore";
import { useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { ref } from "vue";
import { onMounted } from "vue";

export const useFormOneSelect = ({ props }) => {
    const { allOperation, allSWBS, allStage } = useDataGrafosStore();
    const showOperationOption = ref(false);
    const showSWBSOption = ref(false);
    const showStageOption = ref(false);
    const loadingSave = ref(false);

    const form = useForm({
        operation: props.selectedProject[0].Operación_Proceso,
        swbs: props.selectedProject[0].SWBS,
        stage: props.selectedProject[0].Fase,
        graph: props.selectedProject[0].Grafo_OP,
        block: props.selectedProject[0].Bloque || "N/A",
        state: true,
    });

    const onSaveProjectSelect = async () => {
        try {
            const { isConfirmed } = await Swal.fire({
                title: "Seguro que quieres guardar los cambios?",
                text: "Los datos se actualizarán en la base de datos.",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#023f86",
                cancelButtonColor: "red",
                confirmButtonText: "Actualizar",
            });

            if (!isConfirmed) return;

            loadingSave.value = true;

            const formData = new FormData();

            formData.append("operation", form.operation);
            formData.append("swbs", form.swbs);
            formData.append("stage", form.stage);
            formData.append("graph", form.graph);
            formData.append("block", form.block);
            formData.append("state", form.state ? "Activo" : "Inactivo");
            formData.append("id", props.selectedProject[0].Id);

            const response = await axios.post(
                route("reports.updateGraph"),
                formData
            );

            if (response.status === 200) {
                Swal.fire({
                    title: "Datos actualizados",
                    text: "Los datos se han actualizado correctamente.",
                    icon: "success",
                    confirmButtonColor: "#023f86",
                });

                props.onUpdateProjectSelected(response.data);

                props.onCancelEdit(props.selectedProject[0].Id);
            }
        } catch (error) {
            console.log(error);
        } finally {
            loadingSave.value = false;
        }
    };

    const onCanceledProjectSelect = () => {
        Swal.fire({
            title: "Seguro que quieres cancelar la edición?",
            showDenyButton: true,
            confirmButtonText: "Cancelar",
            confirmButtonColor: "red",
            denyButtonText: `Seguir`,
            denyButtonColor: "green",
        }).then((result) => {
            if (result.isConfirmed) {
                props.onCancelEdit(props.selectedProject[0].Id);
            }
        });
    };

    onMounted(() => {
        if (
            !allOperation.some(
                (operation) =>
                    operation.detalle ===
                    props.selectedProject[0].Operación_Proceso
            )
        ) {
            showOperationOption.value = true;
        }

        if (
            !allSWBS.some((swbs) => swbs.swbs === props.selectedProject[0].SWBS)
        ) {
            showSWBSOption.value = true;
        }

        if (
            !allStage.some(
                (stage) => stage.fase === props.selectedProject[0].Fase
            )
        ) {
            showStageOption.value = true;
        }
    });

    return {
        showOperationOption,
        showSWBSOption,
        showStageOption,
        loadingSave,
        form,
        onSaveProjectSelect,
        onCanceledProjectSelect,
        allOperation,
        allSWBS,
        allStage,
    };
};
