import { format, parseISO } from "date-fns";
import type { TooltipComponentFormatterCallbackParams } from "echarts";

export const getTooltipContent = (params: TooltipComponentFormatterCallbackParams) => {
    let toolTipContent = "";

    if (!Array.isArray(params)) return "";

    for (let index = 0; index <= params.length; index++) {
        const param = params[index];
        if (param) {
            const { seriesName, data, marker } = param;
            if (!Array.isArray(data) || !data[0]) continue;
            const date = parseISO(data[0].toString());
            const isHour = date.getHours() > 0;

            toolTipContent +=
                index === 0
                    ? `Time: ${isHour ? format(date, "HH:mm:ss") : format(date, "mm:ss")}
                             <br> ${marker} ${seriesName}: ${data[1]}`
                    : `<br> ${marker} ${seriesName}: ${data[1]}`;
        }
    }
    return toolTipContent;
};
