import { validFormBeforeNextTab, validFormRequest } from "@/Validations";
import { useForm, usePage } from "@inertiajs/vue3";
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
        files: [],
    });

    const { props } = usePage();
    const tabs = ref(1);
    const isLoadingRequest = ref(false);

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

    const showDateNow = (fecha) => {
        const opcionesFecha = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        const opcionesHora = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };

        const fechaHoy = fecha.toLocaleDateString("es-ES", opcionesFecha);
        const horaActual = fecha.toLocaleTimeString("es-ES", opcionesHora);

        return `${fechaHoy} - ${horaActual}`;
    };

    const submitForm = async () => {
        if (!validFormRequest(form)) {
            return;
        }

        try {
            isLoadingRequest.value = true;

            const solicitanteNombresString = form.solicitante
                .map((solicitante) => solicitante.nombre)
                .join(", ");
            const solicitanteCorreosString = form.solicitante
                .map((solicitante) => solicitante.correo)
                .join(", ");
            const interesadoNombresString = form.interesado
                .map((interesado) => interesado.nombre)
                .join(", ");
            const interesadoCorreosString = form.interesado
                .map((interesado) => interesado.correo)
                .join(", ");

            const formPost = {
                Caso: form.caso,
                Buque: form.buque.buque,
                Proceso: form.proceso,
                ClienteExterno: form.clienteExterno,
                TipoBuque: form.tipoBuque,
                Planta: form.planta,
                Solicitante: solicitanteNombresString,
                CorreoSolicitante: solicitanteCorreosString,
                Interesado: interesadoNombresString,
                CorreoInteresado: interesadoCorreosString,
                IdTipoServicio: form.tipoServicio.id,
                Detalle: form.servicioSolicitado.NombreTipo,
                Titulo: form.tipoServicio.descripcion,
                FechaSolicitud: new Date(),
                Asignado: form.solicitudGenerada,
                FechaSolucion: form.fechaSolucion,
                Estado: "Activa",
                Asignado: props.auth.user.name,
                TipoCopia: form.tipoCopia,
                Armador: form.armador,
                CasaClasificadora: form.casaClasificadora,
                NumeroIMO: form.numeroIMO,
                InspectorCampo: form.inspectorCampo,
                GerenteProyecto: form.gerenteProyecto,
                OT: form.grafo,
                Files: form.files,
            };

            const response = await axios.post(
                route("post.requeriment"),
                formPost
            );

            console.log(response);

            isLoadingRequest.value = false;

            Swal.fire({
                icon: "success",
                title: "Campos guardados correctamente",
                text: "La solicitud ha sido registrada correctamente",
            });
        } catch (error) {
            console.log("Error al guardar la solicitud", error);
        }
    };

    return {
        form,
        tabs,
        isLoadingRequest,
        nextTab,
        prevTab,
        submitForm,
    };
};
