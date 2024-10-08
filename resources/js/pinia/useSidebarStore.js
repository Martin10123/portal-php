import { defineStore } from "pinia";
import axios from "axios";

export const useSidebarStore = defineStore("sidebar", {
    state: () => ({
        listUsersPrivileges: [],
        listOptions: [],
        listFloors: [],
    }),
    actions: {
        async fetchUsersPrivileges() {
            if (this.listUsersPrivileges.length === 0) {
                try {
                    const response = await axios.get(
                        route("privilegios.index")
                    );
                    this.listUsersPrivileges = response.data.data;
                } catch (error) {
                    console.error(error);
                }
            }
        },
        async fetchFloors(storeCalendar) {
            if (this.listFloors.length === 0) {
                await storeCalendar.getFloors();
                this.listFloors = storeCalendar.allFloorsCalendar.data.map(
                    (floor) => ({
                        label:
                            floor.Sala_Name ===
                            "Laboratorio de Realidad Extendida"
                                ? "Laboratorio XRLAB"
                                : floor.Sala_Name,
                        icon: "pi pi-list",
                        route: `/Sigedin/CalendarPage/CalendarPage?floor=${floor.ID}`,
                    })
                );
            }
        },
        generateOptions() {
            const options = [
                {
                    id: 0,
                    label: "Solicitudes",
                    icon: "pi pi-folder-plus",
                    items: [
                        {
                            label: "Agregar solicitud",
                            icon: "pi pi-file-plus",
                            route: "/Sigedin/Request/AddRequest",
                        },
                    ],
                },
                {
                    id: 1,
                    label: "Planillación",
                    icon: "pi pi-file-check",
                    items: [
                        {
                            label: "Gestion de grafos",
                            icon: "pi pi-list-check",
                            route: "/Sigedin/Personnel/Reports",
                        },
                    ],
                },
                {
                    id: 2,
                    label: "Reservar sala",
                    icon: "pi pi-bell",
                    items: [
                        ...this.listFloors,
                        {
                            label: "Gestionar salas",
                            icon: "pi pi-clipboard",
                            route: "/Sigedin/CalendarPage/AdminFloor",
                        },
                    ],
                },
                {
                    id: 3,
                    label: "Graficos",
                    icon: "pi pi-chart-bar",
                    items: [
                        {
                            label: "Index",
                            icon: "pi pi-chart-pie",
                            route: "/Sigedin/Charts/ChartsMain",
                        },
                    ],
                },
            ];

            this.listOptions = options.filter((option) => {
                if (this.listUsersPrivileges.length === 0 && option.id === 2) {
                    option.items.pop();
                    return option;
                }

                return this.listUsersPrivileges.some((privilege) => {
                    return (
                        privilege.Is_Visible === "1" &&
                        Number(privilege.Menu_Items_ID) === option.id
                    );
                });
            });
        },
    },
});
