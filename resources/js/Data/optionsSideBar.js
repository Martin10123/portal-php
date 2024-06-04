export const optionsItemSidebar = [
    {
        title: "Solicitudes",
        hasSubItems: true,
        icon: "fa-solid fa-list",
        other: [
            { title: "Agregar solicitud", goTo: "/Sigedin/Request/AddRequest" },
            {
                title: "Aprobar solicitud",
                goTo: "/Sigedin/Request/ApproveRequest",
            },
        ],
    },
];
