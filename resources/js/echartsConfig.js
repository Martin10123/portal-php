import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import { PieChart } from "echarts/charts";
import { TreemapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import {
    DatasetComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
    TitleComponent,
} from "echarts/components";

export const echartsConfig = () => {
    use([
        DatasetComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        BarChart,
        CanvasRenderer,
        DataZoomComponent,
        PieChart,
        TitleComponent,
        TreemapChart,
    ]);
};
