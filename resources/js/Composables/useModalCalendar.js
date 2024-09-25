import { ref, onMounted } from "vue";
import axios from "axios";
import { createPopper } from "@popperjs/core";
import { useDataCalendarStore } from "@/pinia/useDataCalendarStore";
import { usePage } from "@inertiajs/vue3";

export const useModalCalendar = (form) => {
    const storeCalendar = useDataCalendarStore();
    const usersEmails = ref([]);
    const listaTipoServicios = ref([]);
    const listManagement = ref([]);
    const listFloors = ref([]);
    const { url } = usePage();

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

    const getEmailsUsers = () =>
        fetchData(route("users.index"), (data) => {
            usersEmails.value = data;
        });

    const getTypeServices = () =>
        fetchData(route("typeServices.index"), (data) => {
            listaTipoServicios.value = data.data;
        });

    const getManagement = () =>
        fetchData(route("management.index"), (data) => {
            listManagement.value = data;
        });

    onMounted(async () => {
        try {
            await Promise.all([
                getEmailsUsers(),
                getTypeServices(),
                getManagement(),
            ]);

            await storeCalendar.getFloors();

            const floorSelect = url.split("floor=")[1];

            listFloors.value = storeCalendar.allFloorsCalendar.data.filter(
                (floor) => floor.ID === Number(floorSelect)
            );

            form.floor = listFloors.value[0];
        } catch (error) {
            handleError(error);
        }
    });

    return {
        usersEmails,
        listaTipoServicios,
        listManagement,
        listFloors,
        calcSpacing,
    };
};
