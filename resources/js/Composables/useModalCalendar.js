import { ref, onMounted } from 'vue';
import axios from 'axios';
import { createPopper } from '@popperjs/core';

export const useModalCalendar = () => {
    const usersEmails = ref([]);
    const listaTipoServicios = ref([]);
    const listManagement = ref([]);

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

    // Handle API requests
    const fetchData = async (url, setData) => {
        try {
            const { data } = await axios.get(url);
            setData(data);
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        console.error("API error: ", error);
    };

    const getEmailsUsers = () => fetchData(route("users.index"), data => {
        usersEmails.value = data;
    });

    const getTypeServices = () => fetchData(route("typeServices.index"), data => {
        listaTipoServicios.value = data.data;
    });

    const getManagement = () => fetchData(route("management.index"), data => {
        listManagement.value = data;
    });

    onMounted(async () => {
        try {
            await Promise.all([getEmailsUsers(), getTypeServices(), getManagement()]);
        } catch (error) {
            handleError(error);
        }
    });

    return {
        usersEmails,
        listaTipoServicios,
        listManagement,
        calcSpacing
    };
};
