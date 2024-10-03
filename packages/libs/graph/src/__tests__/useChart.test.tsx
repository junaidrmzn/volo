import type { EChartsOption } from "echarts";
import { render, screen } from "@voloiq/testing";
import { useChart } from "../chart";

const mockedOption = {
    title: {
        text: "ECharts Getting Started Example",
    },
    tooltip: {},
    legend: {
        data: ["sales"],
    },
    xAxis: {
        data: ["Shirts", "Cardigans", "Chiffons", "Pants", "Heels", "Socks"],
    },
    yAxis: {},
    series: [
        {
            name: "sales",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
        },
    ],
};

const ChartTest = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const chartRef = useChart(mockedOption as EChartsOption);
    return <div ref={chartRef} data-testid="chart" />;
};

describe("useChart", () => {
    test("render getting started example expect chart to be visible", () => {
        render(<ChartTest />);
        expect(screen.getByTestId("chart")).toBeVisible();
    });
});
