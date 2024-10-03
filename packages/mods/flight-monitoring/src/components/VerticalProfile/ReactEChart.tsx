import type { EChartsOption, SetOptionOpts } from "echarts";
import type { CSSProperties } from "react";
import { useVerticalProfile } from "./useVerticalProfile";

export type ReactEChartsProps = {
    option: EChartsOption;
    style?: CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    theme?: "light" | "dark";
};

export const ReactECharts = (props: ReactEChartsProps) => {
    const { option, style, settings, loading, theme } = props;
    const { chartRef } = useVerticalProfile(option, settings, loading, theme);

    return <div ref={chartRef} style={{ width: "100%", height: "100%", ...style }} />;
};
