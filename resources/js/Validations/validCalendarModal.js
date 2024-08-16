import Swal from "sweetalert2";

export const validateFormCalendar = ({
    floor,
    title,
    description,
    date,
    division,
    typeService,
    dateHours,
    participantsNecesary,
}) => {
    if (!floor) {
        alertMessage("El lugar de reunión es requerido!");
        return false;
    }

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

    if (!division || division === "***") {
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

    if (participantsNecesary.length < 1) {
        alertMessage(
            "Al menos 2 participantes son necesarios para hacer un evento!"
        );
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
