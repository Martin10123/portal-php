import { validFormBeforeNextTab, validFormRequest } from "@/Validations";
import { useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { ref } from "vue";

export const useAddRequest = () => {
    const form = useForm({
        tipoRegistro: "Operativo",
        buque: "",
        caso: "",
        proceso: "",
        clienteExterno: "",
        tipoBuque: "",
        planta: "",
        interesado: "",
        solicitante: "",
        grafo: "",
        tipoServicio: "",
        servicioSolicitado: "",
        pendiente: "",
        tipoCopia: "",
        fechaSolucion: "",
        solicitudGenerada: "",
        consecutivoEC: "",
        descripcionServicio: "",
        informacionAdjunta: "",
        armador: "",
        casaClasificadora: "",
        numeroIMO: "",
        inspectorCampo: "",
        gerenteProyecto: "",
    });

    const tabs = ref(1);

    const nextTab = (e) => {
        e.preventDefault();

        if (!validFormBeforeNextTab(form)) {
            return;
        }

        if (form.grafo === "") {
            if (form.servicioSolicitado.NombreTipo.includes("Estimación")) {
                form.grafo = "N/A";
                return;
            }

            form.grafo = "Pendiente";
        }

        tabs.value += 1;
    };

    const prevTab = (e) => {
        e.preventDefault();
        tabs.value -= 1;
    };

    const submitForm = () => {
        if (!validFormRequest(form)) {
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Campos guardados correctamente",
            text: "La solicitud ha sido registrada correctamente",
        });
    };

    return {
        form,
        tabs,
        nextTab,
        prevTab,
        submitForm,
    };
};
