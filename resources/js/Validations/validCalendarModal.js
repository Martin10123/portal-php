import Swal from "sweetalert2";

export const validateFormCalendar = ({
    title,
    description,
    date,
    division,
    typeService,
    dateHours,
    participantsNecesary,
    resource,
}) => {
    if (!title) {
        alertMessage("El titulo es requerido!");
        return false;
    }

    if (!typeService) {
        alertMessage("Tipo de servicio es requerido!");
        return false;
    }

    if (!description) {
        alertMessage("La descripción es requerida!");
        return false;
    }

    if (!division) {
        alertMessage("La división es requerido!");
        return false;
    }

    if (!date) {
        alertMessage("La fecha es requerida!");
        return false;
    }

    if (dateHours.length === 0) {
        alertMessage("La hora de duración es requerida!");
        return false;
    }

    if (participantsNecesary.length <= 0) {
        alertMessage(
            "Al menos 3 participantes son necesarios para hacer un evento!"
        );
        return false;
    }

    if (resource.length === 0) {
        alertMessage("Resource es requerido!");
        return false;
    }

    return true;
};

const alertMessage = (text) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text,
    });
};
