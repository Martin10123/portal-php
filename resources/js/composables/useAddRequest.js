import { validFormBeforeNextTab, validFormRequest } from "@/Validations";
import { removeAccentsAndCompareTexts } from "@/Validations/removeAccentsOfWords";
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
            form.grafo = "Pendiente";

            if (
                removeAccentsAndCompareTexts(
                    form.servicioSolicitado.NombreTipo,
                    "Estimación"
                )
            ) {
                form.grafo = "N/A";
            }
        }

        tabs.value += 1;
    };

    const prevTab = (e) => {
        e.preventDefault();
        tabs.value -= 1;
    };

    const formatNamesAndEmails = (array) => {
        const nombresString = array.map((item) => item.nombre).join("; ");
        const correosString = array.map((item) => item.correo).join("; ");

        return { nombresString, correosString };
    };

    const submitForm = async () => {
        if (!validFormRequest(form)) {
            return;
        }

        try {
            isLoadingRequest.value = true;

            const {
                nombresString: solicitanteNombresString,
                correosString: solicitanteCorreosString,
            } = formatNamesAndEmails(form.solicitante);
            const {
                nombresString: interesadoNombresString,
                correosString: interesadoCorreosString,
            } = formatNamesAndEmails(form.interesado);

            const formData = new FormData();
            formData.append("TipoUsuario", form.tipoRegistro);
            formData.append("Caso", form.caso);
            formData.append("Buque", form.buque.buque);
            formData.append("Proceso", form.proceso);
            formData.append("ClienteExterno", form.clienteExterno);
            formData.append("TipoBuque", form.tipoBuque);
            formData.append("Planta", form.planta);
            formData.append("Solicitante", solicitanteNombresString);
            formData.append("CorreoSolicitante", solicitanteCorreosString);
            formData.append("Interesado", interesadoNombresString);
            formData.append("CorreoInteresado", interesadoCorreosString);
            formData.append("IdTipoServicio", form.tipoServicio.id);
            formData.append("TituloReq", form.servicioSolicitado.NombreTipo);
            formData.append("Titulo", form.tipoServicio.descripcion);
            formData.append("FechaSolicitud", new Date().toISOString());
            formData.append("Consecutivo", form.consecutivoEC);
            formData.append(
                "FechaSolucion",
                new Date(form.fechaSolucion).toISOString()
            );
            formData.append("Estado", "Activa");
            formData.append("UsuarioIngreso", props.auth.user.name);
            formData.append("TipoCopia", form.tipoCopia);
            formData.append("Armador", form.armador);
            formData.append("CasaClasificadora", form.casaClasificadora);
            formData.append("NumeroIMO", form.numeroIMO);
            formData.append("Informador", form.inspectorCampo);
            formData.append("GerenteProyecto", form.gerenteProyecto);
            formData.append("OT", form.grafo);

            for (let i = 0; i < form.files.length; i++) {
                formData.append("Files[]", form.files[i]);
            }

            const response = await axios.post(
                route("post.requeriment"),
                formData
            );

            console.log(response);

            isLoadingRequest.value = false;

            Swal.fire({
                icon: "success",
                title: "Campos guardados correctamente",
                text: "La solicitud ha sido registrada correctamente",
            });

            form.reset();
            tabs.value = 1;
        } catch (error) {
            console.log("Error al guardar la solicitud", error);

            isLoadingRequest.value = false;

            Swal.fire({
                icon: "error",
                title: "Error al guardar la solicitud",
                text: "Por favor intenta nuevamente",
            });
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
