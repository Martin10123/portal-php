export const optionsColumnGraphLineBar = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            label: {
                backgroundColor: "#283b56",
            },
        },
    },
    dataset: [
        {
            dimensions: ["tarea", "total"],
            source: [],
        },
        {
            transform: {
                type: "sort",
                config: { dimension: "total", order: "desc" },
            },
        },
    ],
    xAxis: {
        type: "category",
        axisLabel: { interval: 0, rotate: 30 },
        show: false,
    },
    yAxis: {},
    series: {
        type: "bar",
        encode: { x: "name", y: "score" },
        datasetIndex: 1,
    },
    dataZoom: [
        {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 100,
            height: 15,
            bottom: 10,
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
