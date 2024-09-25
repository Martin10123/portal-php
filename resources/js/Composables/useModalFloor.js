import { onMounted, watch, ref } from "vue";
import { useForm } from "@inertiajs/vue3";

export const useModalFloor = ({ emit, props }) => {
    const listResponsables = ref([]);
    const listColors = [
        { name: "Rojo", valueC: "#FF0000" },
        { name: "Azul", valueC: "#0000FF" },
        { name: "Azul claro", valueC: "#0099ff" },
        { name: "Verde", valueC: "#008000" },
        { name: "Amarillo", valueC: "#FFFF00" },
        { name: "Morado", valueC: "#800080" },
        { name: "Rosa", valueC: "#FFC0CB" },
        { name: "Gris", valueC: "#808080" },
        { name: "Negro", valueC: "#000000" },
    ];

    const form = useForm({
        floorName: "",
        floorAlias: "",
        responsables: [],
        color: "",
        floorState: true,
    });

    watch(
        () => props.sala,
        (newVal) => {
            if (newVal && props.isEditing) {
                const findColor = listColors.find(
                    (c) => c.valueC === newVal.Sala_Color
                );

                form.floorName = newVal.Sala_Name;
                form.floorAlias = newVal.Sala_Alias;
                form.color = findColor;
                form.responsables = newVal.responsables.map((re) => {
                    return {
                        ...re,
                        nombre: re.Nombre,
                        correo: re.Correo,
                        cargo: re.Cargo,
                    };
                });
            }

            if (!props.isEditing) {
                form.floorName = "";
                form.floorAlias = "";
                form.responsables = [];
                form.color = "";
                form.floorState = true;
            }
        }
    );

    const selectColor = (color) => {
        form.color = color;
    };

    const save = () => {
        if (props.isEditing) {
            emit("updateFloor", form);
        } else {
            emit("addFloor", form);
        }
    };

    const getAllResponsables = async () => {
        try {
            const response = await axios.get(route("users.index"));

            listResponsables.value = response.data;
        } catch (error) {
            console.log(error);
        }
    };

    onMounted(() => {
        getAllResponsables();
    });

    return {
        form,
        listColors,
        listResponsables,
        selectColor,
        save,
    };
};
