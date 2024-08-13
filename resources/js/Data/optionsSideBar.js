import requestIcon from "@/Assets/requestIcon.svg";
import reportsPayrof from "@/Assets/reportsPayrof.svg";
import reserveIcon from "@/Assets/reserve.svg";

export const optionsItemSidebar = [
    {
        title: "Solicitudes",
        hasSubItems: true,
        icon: requestIcon,
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
        icon: reportsPayrof,
        subItems: [
            {
                title: "Gestion de grafos",
                goTo: "/Sigedin/Personnel/Reports",
            },
        ],
    },
    {
        title: "Reservar XRLAB",
        hasSubItems: true,
        icon: reserveIcon,
        subItems: [
            {
                title: "Reservar el laboratorio",
                goTo: "/Sigedin/CalendarPage/CalendarPage",
            },
            {
                title: "Administrar el laboratorio",
                goTo: "",
                isOnlyAdmin: true,
            },
        ],
    },
];
