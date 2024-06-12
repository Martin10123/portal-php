import RequestIcon from "../Assets/RequestIcon.vue";

export const optionsItemSidebar = [
    {
        title: "Solicitudes",
        hasSubItems: true,
        Icon: RequestIcon,
        subItems: [
            { title: "Agregar solicitud", goTo: "/Sigedin/Request/AddRequest" },
            {
                title: "Aprobar solicitud",
                goTo: "/Sigedin/Request/ApproveRequest",
            },
        ],
    },
];
