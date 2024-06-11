import { useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { ref } from "vue";

export const useAddRequest = () => {
    const form = useForm({
        tipoRegistro: "Operativo",
        buque: "",
        caso: "",
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

        if (
            form.buque == "" ||
            form.caso == "" ||
            form.clienteExterno == "" ||
            form.tipoBuque == "" ||
            form.planta == "" ||
            form.interesado.length == 0 ||
            form.solicitante.length == 0 ||
            form.tipoServicio < 0 ||
            form.tipoServicio > 5 ||
            form.servicioSolicitado.length == 0
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Complete los campos requeridos",
            });

            return;
        }

        if (form.grafo === "") {
            form.grafo = "Pendiente";
        }

        tabs.value += 1;
    };

    const prevTab = (e) => {
        e.preventDefault();
        tabs.value -= 1;
    };

    const submitForm = () => {
        if (form.fechaSolucion === "" || form.descripcionServicio === "") {
            Swal.fire({
                icon: "error",
                title: "Complete los campos requeridos",
                text: "La fecha de solución y la descripción del servicio son obligatorios",
            });

            return;
        }

        if (form.servicioSolicitado === "Copias de Planos o Escaner") {
            if (form.tipoCopia === "") {
                Swal.fire({
                    icon: "error",
                    title: "Complete los campos requeridos",
                    text: "El tipo de copia es obligatorio",
                });

                return;
            }
        }

        if (form.servicioSolicitado.includes("Plano")) {
            if (
                form.armador === "" ||
                form.casaClasificadora === "" ||
                form.numeroIMO === "" ||
                form.inspectorCampo === "" ||
                form.gerenteProyecto === ""
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Complete los campos requeridos",
                    text: "Los campos de armador, casa clasificadora, número IMO, inspector de campo y gerente de proyecto son obligatorios",
                });

                return;
            }
        }
    };

    return {
        form,
        tabs,
        nextTab,
        prevTab,
        submitForm,
    };
};
