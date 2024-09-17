import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from "echarts/components";

export function initECharts() {
    use([
        CanvasRenderer,
        BarChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        GridComponent,
    ]);
}
