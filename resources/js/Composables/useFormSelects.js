import { useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { ref } from "vue";

export const useFormSelects = ({ props }) => {
    const loadingSave = ref(false);

    const form = useForm({
        operation: "",
        stage: "",
        swbs: "",
        codeSap: "",
        block: "",
        state: true,
        project: "",
        case: "",
    });

    const onSaveGrafoEdit = async () => {
        if (
            form.operation.trim() === "" &&
            form.stage.trim() === "" &&
            form.swbs.trim() === "" &&
            form.codeSap.trim() === "" &&
            form.block.trim() === "" &&
            form.project.trim() === "" &&
            form.case.trim() === "" &&
            form.state === true
        ) {

            Swal.fire({
                icon: "error",
                title: "Advertencia",
                text: "Todos los campos son iguales a los originales"
            })

            return;
        }

        loadingSave.value = true;

        try {
            const response = await axios.post(
                route("reports.updateMassaGraphs"),
                {
                    id: 0,
                    block: form.block,
                    case: form.case,
                    codeSap: form.codeSap,
                    operation: form.operation,
                    project: form.project,
                    stage: form.stage,
                    state: form.state ? "Activo" : "Inactivo",
                    swbs: form.swbs,
                    reports: props.selectedProject,
                }
            );

            if (response.status === 200) {
                for (const data of response.data) {
                    props.onUpdateProjectSelected(data);
                }

                Swal.fire({
                    icon: "success",
                    title: "Se guardo correctamente",
                    text: "Los datos se guardaron correctamente"
                })
            }
        } catch (error) {
            console.log(error);
        } finally {
            loadingSave.value = false;
        }
    };

    return {
        loadingSave,
        form,
        onSaveGrafoEdit,
    };
};
