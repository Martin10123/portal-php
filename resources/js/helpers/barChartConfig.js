export const optionsColumnGraphBar = {
    legend: {},
    tooltip: {},
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            saveAsImage: { show: true },
        },
    },
    dataset: {
        dimensions: ["semana", "HHSemana", "HHAcumulada"],
        source: [],
    },
    xAxis: {
        type: "category",
        axisLabel: { interval: 0 },
    },
    yAxis: {},
    series: [
        {
            type: "bar",
            name: "HHSemana",
            encode: { x: "semana", y: "HHSemana" },
            barWidth: 20,
        },
        {
            type: "bar",
            name: "HHAcumulada",
            encode: { x: "semana", y: "HHAcumulada" },
            barWidth: 20,
        },
    ],
    grid: {
        containLabel: true,
    },
    dataZoom: [
        {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 20,
            height: 15,
            bottom: 20,
            handleSize: 20,
        },
        {
            type: "inside",
            xAxisIndex: 0,
            start: 50,
            end: 70,
            zoomOnMouseWheel: true,
            moveOnMouseWheel: true,
        },
    ],
};
