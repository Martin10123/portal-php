import * as echarts from "echarts";

function getLevelOption() {
    return [
        {
            itemStyle: {
                borderColor: "#777",
                borderWidth: 0,
                gapWidth: 1,
            },
            upperLabel: {
                show: false,
            },
        },
        {
            itemStyle: {
                borderColor: "#555",
                borderWidth: 5,
                gapWidth: 1,
            },
            emphasis: {
                itemStyle: {
                    borderColor: "#ddd",
                },
            },
        },
        {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
                borderWidth: 5,
                gapWidth: 1,
                borderColorSaturation: 0.6,
            },
        },
    ];
}

export const optionsColumnGraphTreeMap = {
    title: {
        text: "Tareas",
        left: "center",
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
        },
    },
    tooltip: {
        formatter: function (info) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];
            for (var i = 1; i < treePathInfo.length; i++) {
                treePath.push(treePathInfo[i].name);
            }
            return [
                '<div class="tooltip-title">' +
                    echarts.format.encodeHTML(treePath.join("/")) +
                    "</div>",
                "Tareas: " + echarts.format.addCommas(value),
            ].join("");
        },
    },
    series: [
        {
            name: "Tareas",
            type: "treemap",
            visibleMin: 300,
            label: {
                show: true,
                formatter: "{b}",
            },
            upperLabel: {
                show: true,
                height: 30,
            },
            itemStyle: {
                borderColor: "#fff",
            },
            levels: getLevelOption(),
            data: [],
        },
    ],
};
