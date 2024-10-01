import { useDataCalendarStore } from "@/pinia/useDataCalendarStore";
import { usePage } from "@inertiajs/vue3";
import { onMounted, ref, computed } from "vue";

export const useGetOptionsSidebar = () => {
    const storeCalendar = useDataCalendarStore();
    const listFloors = ref([]);
    const listOptions = ref([]);
    const listUsersPrivileges = ref([]);
    const { props } = usePage();

    const hiddenSidebar = ref(false);

    const SIDEBAR_OPEN =
        "fixed sm:sticky sm:h-screen-calc-4 top-0 sm:top-401 left-0 z-40 w-64 lg:min-w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 duration-300";
    const SIDEBAR_CLOSED =
        "relative lg:w-0 sm:w-0 h-screen-calc-4 left-[-6rem] duration-300 overflow-hidden";

    const TOGGLE_BTN_OPEN =
        "fixed top-[50%] -right-5 -translate-y-1/2 bg-white rounded-[50%] w-10 h-10 flex items-center justify-center cursor-pointer shadow hover:bg-slate-100 z-[999] duration-300";
    const TOGGLE_BTN_CLOSED =
        "fixed top-[50%] left-[-1rem] -translate-y-1/2 bg-white rounded-[50%] w-10 h-10 flex items-center justify-center cursor-pointer shadow hover:bg-slate-100 z-[999] duration-300";

    const classNameStyle = computed(() => ({
        sidebar: hiddenSidebar.value ? SIDEBAR_CLOSED : SIDEBAR_OPEN,
        toggleBtn: hiddenSidebar.value ? TOGGLE_BTN_CLOSED : TOGGLE_BTN_OPEN,
    }));

    const toggleOpenSidebarCom = () => {
        hiddenSidebar.value = !hiddenSidebar.value;
    };

    const generateFloorOptions = (floors) => {
        return floors.map((floor) => ({
            label:
                floor.Sala_Name === "Laboratorio de Realidad Extendida"
                    ? "Laboratorio XRLAB"
                    : floor.Sala_Name,
            icon: "pi pi-list",
            route: `/Sigedin/CalendarPage/CalendarPage?floor=${floor.ID}`,
        }));
    };

    const fetchUsersPrivileges = async () => {
        try {
            const response = await axios.get(route("privilegios.index"));

            listUsersPrivileges.value = response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSidebarOptions = async () => {
        await storeCalendar.getFloors();

        listFloors.value = generateFloorOptions(
            storeCalendar.allFloorsCalendar.data
        );

        const options = [
            {
                label: "Solicitudes",
                icon: "pi pi-folder-plus",
                isOnlyAdmin: true,
                items: [
                    {
                        label: "Agregar solicitud",
                        icon: "pi pi-file-plus",
                        route: "/Sigedin/Request/AddRequest",
                    },
                ],
            },
            {
                label: "Planillación",
                icon: "pi pi-file-check",
                isOnlyAdmin: true,
                items: [
                    {
                        label: "Gestion de grafos",
                        icon: "pi pi-list-check",
                        route: "/Sigedin/Personnel/Reports",
                    },
                ],
            },
            {
                label: "Reservar sala",
                icon: "pi pi-bell",
                items: [
                    ...listFloors.value,
                    {
                        label: "Gestionar salas",
                        icon: "pi pi-clipboard",
                        isOnlyAdmin: true,
                        route: "/Sigedin/CalendarPage/AdminFloor",
                    },
                ],
            },
            {
                label: "Graficos",
                icon: "pi pi-chart-bar",
                isOnlyAdmin: true,
                items: [
                    {
                        label: "Index",
                        icon: "pi pi-chart-pie",
                        route: "/Sigedin/Charts/ChartsMain",
                    },
                ],
            },
        ];

        listOptions.value = options.filter((option) => {
            return (
                !option.isOnlyAdmin ||
                props.auth.user.IsAdmin === "1" ||
                props.auth.user.IdResponsable === ""
            );
        });
    };

    onMounted(() => {
        fetchSidebarOptions();
        fetchUsersPrivileges();
    });

    return {
        listOptions,
        classNameStyle,
        toggleOpenSidebarCom,
    };
};
