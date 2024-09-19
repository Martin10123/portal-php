import requestIcon from "@/Assets/requestIcon.svg";
import reportsPayrof from "@/Assets/reportsPayrof.svg";
import reserveIcon from "@/Assets/reserve.svg";
import chartIcon from "@/Assets/charts.svg";

export const optionsItemSidebar = [
    {
        title: "Solicitudes",
        hasSubItems: true,
        isOnlyAdmin: true,
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
        isOnlyAdmin: true,
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
            // {
            //     title: "Gestión de salas",
            //     goTo: "/Sigedin/CalendarPage/AdminFloor",
            //     isOnlyAdmin: true,
            // },
        ],
    },
    {
        title: "Graficos",
        hasSubItems: true,
        isOnlyAdmin: true,
        icon: chartIcon,
        subItems: [
            {
                title: "index",
                goTo: "/Sigedin/Charts/ChartsMain",
            },
        ],
    },
];
