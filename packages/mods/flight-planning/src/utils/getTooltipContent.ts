import type { DefaultLabelFormatterCallbackParams } from "echarts";
// eslint-disable-next-line no-restricted-imports
import type { TopLevelFormatterParams } from "echarts/types/src/component/tooltip/TooltipModel";
import { formatTtoFromSeconds } from "./formatTtoFromSeconds";

export const getTooltipContent = (params: TopLevelFormatterParams): string => {
    const paramsList = params as DefaultLabelFormatterCallbackParams[];
    let toolTipContent = "";

    for (let index = 0; index <= paramsList.length; index++) {
        const param = paramsList[index];
        if (param) {
            const paramData = param.data as number[];
            toolTipContent +=
                index === 0
                    ? `Time: ${formatTtoFromSeconds(paramData[0])}
                             <br> ${param.marker} ${param.seriesName}: ${paramData[1]}`
                    : `<br> ${param.marker} ${param.seriesName}: ${paramData[1]}`;
        }
    }
    return toolTipContent;
};
