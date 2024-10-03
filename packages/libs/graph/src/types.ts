import type { EChartsType } from "echarts";

export type SynchronizedChartProps = { registerLegendClickEvent: RegisterLegendClickEventFunctionType };

export type RegisterLegendClickEventFunctionType = (chart: EChartsType) => void;

export type CoordinateSystem = { cx: number; cy: number };
