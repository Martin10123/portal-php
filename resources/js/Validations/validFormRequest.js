import { removeAccentsAndCompareTexts } from "./removeAccentsOfWords";

// Definir mensajes de error en un objeto
const errorMessages = {
    required: "Este campo es obligatorio",
    tipoBuque: "El campo tipo de buque es obligatorio",
    interesado: "El campo interesado es obligatorio",
    solicitante: "El campo solicitante es obligatorio",
    tipoServicio: "El campo tipo de servicio es obligatorio",
    servicioSolicitado: "El campo servicio solicitado es obligatorio",
    fechaSolucion: "El campo fecha de solución es obligatorio",
    descripcionServicio: "El campo descripción del servicio es obligatorio",
    tipoCopia: "El campo tipo de copia es obligatorio",
    armador: "El campo armador es obligatorio",
    casaClasificadora: "El campo casa clasificadora es obligatorio",
    numeroIMO: "El campo número IMO es obligatorio",
    inspectorCampo: "El campo inspector de campo es obligatorio",
    gerenteProyecto: "El campo gerente de proyecto es obligatorio",
};

// Función para validar campos antes de pasar a la siguiente pestaña
export const validFormBeforeNextTab = (form) => {
    form.clearErrors();

    const {
        buque,
        caso,
        clienteExterno,
        tipoBuque,
        planta,
        interesado,
        solicitante,
        tipoServicio,
        servicioSolicitado,
    } = form;

    if (!buque) {
        form.setError("buque", errorMessages.required);
        return false;
    }
    if (!caso) {
        form.setError("caso", errorMessages.required);
        return false;
    }
    if (!clienteExterno) {
        form.setError("clienteExterno", errorMessages.required);
        return false;
    }
    if (!tipoBuque) {
        form.setError("tipoBuque", errorMessages.tipoBuque);
        return false;
    }
    if (!planta) {
        form.setError("planta", errorMessages.required);
        return false;
    }
    if (interesado.length === 0) {
        form.setError("interesado", errorMessages.interesado);
        return false;
    }
    if (solicitante.length === 0) {
        form.setError("solicitante", errorMessages.solicitante);
        return false;
    }
    if (tipoServicio < 0 || tipoServicio > 5) {
        form.setError("tipoServicio", errorMessages.tipoServicio);
        return false;
    }
    if (servicioSolicitado.length === 0) {
        form.setError("servicioSolicitado", errorMessages.servicioSolicitado);
        return false;
    }

    return true;
};

// Función para validar campos antes de enviar la solicitud
export const validFormRequest = (form) => {
    form.clearErrors();

    const {
        fechaSolucion,
        descripcionServicio,
        servicioSolicitado,
        tipoCopia,
        armador,
        casaClasificadora,
        numeroIMO,
        inspectorCampo,
        gerenteProyecto,
    } = form;

    if (!fechaSolucion) {
        form.setError("fechaSolucion", errorMessages.fechaSolucion);
        return false;
    }
    if (!descripcionServicio) {
        form.setError("descripcionServicio", errorMessages.descripcionServicio);
        return false;
    }
    if (
        removeAccentsAndCompareTexts(
            servicioSolicitado.NombreTipo,
            "Copias de Planos o Escaner"
        )
    ) {
        if (!tipoCopia) {
            form.setError("tipoCopia", errorMessages.tipoCopia);
            return false;
        }
    }

    if (
        removeAccentsAndCompareTexts(servicioSolicitado.NombreTipo, "plano") &&
        !removeAccentsAndCompareTexts(
            servicioSolicitado.NombreTipo,
            "Copias de Planos o Escaner"
        )
    ) {
        if (!armador) {
            form.setError("armador", errorMessages.armador);
            return false;
        }
        if (!casaClasificadora) {
            form.setError("casaClasificadora", errorMessages.casaClasificadora);
            return false;
        }
        if (!numeroIMO) {
            form.setError("numeroIMO", errorMessages.numeroIMO);
            return false;
        }
        if (!inspectorCampo) {
            form.setError("inspectorCampo", errorMessages.inspectorCampo);
            return false;
        }
        if (!gerenteProyecto) {
            form.setError("gerenteProyecto", errorMessages.gerenteProyecto);
            return false;
        }
    }

    return true;
};
