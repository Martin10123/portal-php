import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { useDataCalendarStore } from "@/pinia/useDataCalendarStore";
import { usePage } from "@inertiajs/vue3";
import { useGetEmailsStore } from "@/pinia/useGetEmailsStore";

export const useModalCalendar = (form) => {
    const storeCalendar = useDataCalendarStore();
    const storeGetEmails = useGetEmailsStore();
    const listaTipoServicios = ref([]);
    const listManagement = ref([]);

    const { url } = usePage();
    const listFloors = computed(() =>
        storeCalendar.getFloorSelected(url.split("floor=")[1])
    );
    const usersEmails = computed(() => storeGetEmails.usersEmails);

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
            await storeCalendar.getFloors();

            form.floor = listFloors.value[0];

            await Promise.all([getTypeServices(), getManagement()]);
        } catch (error) {
            handleError(error);
        }
    });

    return {
        usersEmails,
        listaTipoServicios,
        listManagement,
        listFloors,
    };
};
