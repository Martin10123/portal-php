export const optionsColumnGraphPie = {
    title: {
        text: "Fase",
        left: "center",
    },
    tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
        },
    },
    series: [
        {
            name: "Fase",
            type: "pie",
            radius: "70%",
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
        },
    ],
};

export const optionsColumnGraphPieAct = {
    title: {
        text: "Actividad",
        left: "center",
    },
    tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
        },
    },
    series: [
        {
            name: "Act",
            type: "pie",
            radius: "70%",
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
        },
    ],
};
