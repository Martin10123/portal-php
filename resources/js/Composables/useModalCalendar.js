import { createPopper } from "@popperjs/core";
import axios from "axios";
import { onMounted, ref } from "vue";

export const useModalCalendar = () => {
    const usersEmails = ref([]);
    const listaTipoServicios = ref([]);

    const calcSpacing = (dropdownList, component, { width }) => {
        dropdownList.style.width = width;

        const popper = createPopper(component.$refs.toggle, dropdownList, {
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, -1],
                    },
                },
                {
                    name: "toggleClass",
                    enabled: true,
                    phase: "write",
                    fn({ state }) {
                        component.$el.classList.toggle(
                            "drop-up",
                            state.placement === "top"
                        );
                    },
                },
            ],
        });

        return () => popper.destroy();
    };

    const getEmailsUsers = async () => {
        try {
            const { data } = await axios.get(route("users.index"));
            usersEmails.value = data;
        } catch (error) {
            console.log("Error en getEmailsUsers: ", error);
        }
    };

    const getTypeServices = async () => {
        try {
            const { data } = await axios.get(route("typeServices.index"));
            listaTipoServicios.value = data.data;
        } catch (error) {
            console.log("Error en getTypeServices: ", error);
        }
    };

    onMounted(() => {
        getEmailsUsers();
        getTypeServices();
    });

    return {
        calcSpacing,
        usersEmails,
        listaTipoServicios,
    };
};
