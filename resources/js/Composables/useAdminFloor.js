import { useDataCalendarStore } from "@/pinia/useDataCalendarStore";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

export const useAdminFloor = () => {
    const storeCalendar = useDataCalendarStore();
    const openAddFloorModal = ref(false);
    const listFloors = ref([]);
    const isEditing = ref(false);
    const currentFloor = ref(null);

    const toggleAddFloorModal = () => {
        openAddFloorModal.value = !openAddFloorModal.value;
        isEditing.value = false;
        currentFloor.value = null;
    };

    const toggleEditFloorModal = (floor) => {
        openAddFloorModal.value = !openAddFloorModal.value;
        currentFloor.value = floor;
        isEditing.value = true;
    };

    const validateForm = (form) => {
        const errors = {};

        if (form.floorName.trim().length <= 6) {
            errors.floorName =
                "El nombre de la sala debe ser mayor a 6 caracteres.";
        }

        if (!form.color) {
            errors.color = "Debes seleccionar un color.";
        }

        if (form.floorAlias.trim().length <= 3) {
            errors.floorAlias = "El alias debe ser mayor a 3 caracteres.";
        }

        if (form.floorName.trim() === form.floorAlias.trim()) {
            Swal.fire({
                icon: "error",
                title: "Nombre y Alias iguales",
                text: "El nombre de la sala y el alias no pueden ser iguales.",
            });
            return false;
        }

        if (form.responsables.length < 1) {
            errors.responsables = "Debes seleccionar al menos un responsable.";
        }

        form.errors = errors;
        return Object.keys(errors).length === 0;
    };

    const onSaveFloor = async (form) => {
        if (!validateForm(form)) {
            return;
        }

        try {
            const response = await axios.post(
                route("calendarPage.createFloor", {
                    Sala_Name: form.floorName,
                    Sala_Alias: form.floorAlias,
                    Sala_Color: form.color,
                    Responsables: form.responsables,
                    estado: true,
                })
            );

            if (response.data.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Sala creada",
                    text: "La sala se ha creado correctamente.",
                });

                openAddFloorModal.value = false;
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al guardar esta sala",
                text:
                    error.response?.data?.message ||
                    "Ocurrió un error inesperado.",
            });
        }
    };

    const extractIds = (responsables) => {
        return responsables.map((responsable) =>
            Number(responsable.idResponsable)
        );
    };

    const areResponsablesEqual = (responsables1, responsables2) => {
        const ids1 = extractIds(responsables1).sort();
        const ids2 = extractIds(responsables2).sort();

        return JSON.stringify(ids1) === JSON.stringify(ids2);
    };

    const hasChanges = (currentFloor, form) => {
        return (
            currentFloor.Sala_Name !== form.floorName ||
            currentFloor.Sala_Alias !== form.floorAlias ||
            currentFloor.Sala_Color !== form.color.valueC ||
            !areResponsablesEqual(
                currentFloor.responsables,
                form.responsables
            ) ||
            !form.floorState
        );
    };

    const onUpdateFloor = async (form) => {
        if (!validateForm(form)) {
            return;
        }

        if (!hasChanges(currentFloor.value, form)) {
            Swal.fire({
                icon: "info",
                title: "Sin cambios",
                text: "No se han realizado cambios en la sala.",
            });
            return;
        }

        try {
            const response = await axios.put(
                route("calendarPage.updateFloor", currentFloor.value.ID),
                {
                    Sala_Name: form.floorName,
                    Sala_Alias: form.floorAlias,
                    Sala_Color: form.color,
                    Responsables: form.responsables,
                    Sala_Estado: form.floorState,
                }
            );

            if (response.data.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Sala actualizada",
                    text: "La sala se ha actualizado correctamente.",
                });

                openAddFloorModal.value = false;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar esta sala",
                text:
                    error.response?.data?.message ||
                    "Ocurrió un error inesperado.",
            });
        }
    };

    onMounted(async () => {
        await storeCalendar.getFloors();

        listFloors.value = storeCalendar.allFloorsCalendar.data;
    });

    return {
        openAddFloorModal,
        toggleAddFloorModal,
        toggleEditFloorModal,
        listFloors,
        onSaveFloor,
        onUpdateFloor,
        currentFloor,
        isEditing,
    };
};
