import RequestIcon from "../Assets/RequestIcon.vue";
import ReportsPayrof from "../Assets/ReportsPayrof.vue";

export const optionsItemSidebar = [
    {
        title: "Solicitudes",
        hasSubItems: true,
        icon: RequestIcon,
        subItems: [
            {
                title: "Agregar solicitud",
                goTo: "/Sigedin/Request/AddRequest",
            },
            {
                title: "Asignar solicitud",
                goTo: "/Sigedin/Request/AssignRequest",
            },
        ],
    },
    {
        title: "Planillación",
        hasSubItems: true,
        icon: ReportsPayrof,
        subItems: [
            {
                title: "Cargar",
                goTo: "",
            },
            {
                title: "Reportes",
                goTo: "/Sigedin/Personnel/Reports",
            },
        ],
    },
];
