import type { ReactEChartsProps } from "./ReactEChart";

export const option: ReactEChartsProps["option"] = {
    grid: {
        left: "50px",
        right: "100px",
        top: "20%",
        bottom: "15%",
    },
    xAxis: {
        name: "Distance (nm)",
        // type: "category",
        minInterval: 0.1,
        maxInterval: 1,
        splitNumber: 6,
        type: "value",
        axisLabel: {
            interval: 5,
            formatter: "  {value} NM  ",
        },
    },
    yAxis: {
        type: "value",
        name: "Altitude AGL (ft)",
    },
    // series data is injected from vertical profile component
};
