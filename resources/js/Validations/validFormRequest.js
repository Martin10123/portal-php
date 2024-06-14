export const validFormBeforeNextTab = (form) => {
    form.clearErrors();

    if (form.buque === "") {
        form.setError("buque", "El campo proyecto es obligatorio");
    }
    if (form.caso === "") {
        form.setError("caso", "El campo caso es obligatorio");
    }
    if (form.clienteExterno === "") {
        form.setError(
            "clienteExterno",
            "El campo cliente externo es obligatorio"
        );
    }
    if (form.tipoBuque === "") {
        form.setError("tipoBuque", "El campo tipo de buque es obligatorio");
    }
    if (form.planta === "") {
        form.setError("planta", "El campo planta es obligatorio");
    }
    if (form.interesado.length === 0) {
        form.setError("interesado", "El campo interesado es obligatorio");
    }
    if (form.solicitante.length === 0) {
        form.setError("solicitante", "El campo solicitante es obligatorio");
    }
    if (form.tipoServicio < 0 || form.tipoServicio > 5) {
        form.setError(
            "tipoServicio",
            "El campo tipo de servicio es obligatorio"
        );
    }
    if (form.servicioSolicitado.length === 0) {
        form.setError(
            "servicioSolicitado",
            "El campo servicio solicitado es obligatorio"
        );
        return false;
    }

    return true;
};

export const validFormRequest = (form) => {
    form.clearErrors();

    if (form.fechaSolucion === "") {
        form.setError(
            "fechaSolucion",
            "El campo fecha de solución es obligatorio"
        );
    }
    if (form.descripcionServicio === "") {
        form.setError(
            "descripcionServicio",
            "El campo descripción del servicio es obligatorio"
        );
        return false;
    }
    if (form.servicioSolicitado.NombreTipo === "Copias de Planos o Escaner") {
        if (form.tipoCopia === "") {
            form.setError("tipoCopia", "El campo tipo de copia es obligatorio");
        }
        return false;
    }
    if (
        form.servicioSolicitado.NombreTipo.includes("Plano") &&
        form.servicioSolicitado.NombreTipo !== "Copias de Planos o Escaner"
    ) {
        if (form.armador === "") {
            form.setError("armador", "El campo armador es obligatorio");
        }
        if (form.casaClasificadora === "") {
            form.setError(
                "casaClasificadora",
                "El campo casa clasificadora es obligatorio"
            );
        }
        if (form.numeroIMO === "") {
            form.setError("numeroIMO", "El campo número IMO es obligatorio");
        }
        if (form.inspectorCampo === "") {
            form.setError(
                "inspectorCampo",
                "El campo inspector de campo es obligatorio"
            );
        }
        if (form.gerenteProyecto === "") {
            form.setError(
                "gerenteProyecto",
                "El campo gerente de proyecto es obligatorio"
            );
            return false;
        }
    }

    return true;
};
