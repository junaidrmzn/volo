import type { DefaultLabelFormatterCallbackParams, EChartsOption } from "echarts";
import { graphHighestObstacleIcon, graphObstacleIcon } from "@voloiq/flight-planning-assets";
import { colors, fontFamily } from "../../utils";

export const symbolSize = 15;
export const verticalProfileLayout = (
    routeAltitudeData: number[][],
    dataGround: number[][],
    colorWaypoints: string,
    fontColor: string,
    bGColorTooltip: string,
    dataSelectedWaypoint: number[],
    dataNextSelectedWaypoint: number[],
    graphObstacles: { [key: string]: number[][] }
): EChartsOption => {
    const colorGroundLine = colors.blue[500];
    const colorGroundArea = colors.blue[200];
    const colorSelectedWaypoint = colors.brightBlue[500];

    const fontSize = "12px";
    const fontWeight = 400;
    const fontSizeTooltip = "16px";
    const groundSpaceLeftRight = Math.round(Math.max(...routeAltitudeData.map((dw) => dw[0]!)) * 0.1);
    const departureVertiport = routeAltitudeData[0];
    const arrivalVertiport = routeAltitudeData[routeAltitudeData.length - 1];
    const dataVertiports = departureVertiport && arrivalVertiport ? [departureVertiport, arrivalVertiport] : [];

    return {
        dataZoom: {
            type: "inside",
            filterMode: "none",
        },
        toolbox: {
            feature: {
                dataZoom: {
                    title: {
                        zoom: "",
                        back: "",
                    },
                    iconStyle: {
                        borderColor: fontColor,
                    },
                    yAxisIndex: "none",
                },
            },
        },
        tooltip: {
            trigger: "item",
            position: "top",
            triggerOn: "none",
            formatter(params) {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                const params2 = params as DefaultLabelFormatterCallbackParams;
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                const values = params2.data as number[];

                return `${values[0]?.toPrecision(3)} NM ${Math.round(values[1] ?? 0)} ft`;
            },
            borderWidth: 0,
            backgroundColor: bGColorTooltip,
            padding: 0,
            extraCssText: "box-shadow: 0 0 0 0",
            textStyle: {
                fontWeight,
                fontFamily,
                fontSize: fontSizeTooltip,
                color: fontColor,
            },
        },
        grid: {
            top: "25%",
            bottom: "0",
            left: "0",
            right: "0",
        },
        textStyle: {
            color: fontColor,
            fontFamily,
            fontSize,
            fontWeight,
        },
        xAxis: {
            min(value) {
                return groundSpaceLeftRight ? value.min - groundSpaceLeftRight / 3 : value.min - 0.1;
            },
            max(value) {
                return groundSpaceLeftRight ? value.max + groundSpaceLeftRight / 2 : value.max + 0.2;
            },
            minInterval: 0.1,
            maxInterval: 0.1,
            type: "value",
            position: "top",
            splitLine: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                interval: "auto",
                formatter: "  {value} NM  ",
                inside: false,
                showMinLabel: false,
                showMaxLabel: false,
                hideOverlap: true,
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            name: "AMSL",
            position: "right",
            nameGap: -15,
            nameRotate: -90,
            nameLocation: "middle",
            nameTextStyle: {
                padding: [0, 40, 0, 0],
            },
            min(value) {
                return Math.round(value.min) - 200;
            },
            max(value) {
                return Math.round(value.max) < 1450 ? 1500 : Math.round(value.max) + 50;
            },
            type: "value",
            minInterval: 1,
            axisLine: {
                show: false,
                onZero: false,
            },
            axisLabel: {
                interval: "auto",
                formatter: "{value} ft",
                inside: true,
                padding: [0, 12, 0, 0],
                showMinLabel: false,
            },
            axisTick: {
                show: false,
            },
            z: 2,
        },
        series: [
            {
                id: "waypoints",
                name: "Waypoint",
                type: "line",
                lineStyle: {
                    width: 5,
                    color: colorWaypoints,
                },
                itemStyle: {
                    color: "white",
                    borderColor: colorWaypoints,
                    borderWidth: 4,
                },
                symbol: "circle",
                smooth: false,
                symbolSize,
                data: routeAltitudeData,
                z: 5,
            },
            {
                id: "selectedWaypoint",
                name: "Selected Waypoint",
                type: "line",
                smooth: false,
                animation: false,
                itemStyle: {
                    color: colorSelectedWaypoint,
                    borderColor: colorWaypoints,
                    borderWidth: 4,
                },
                symbol: "circle",
                symbolSize,
                data: [dataSelectedWaypoint],
                z: 7,
            },
            {
                id: "nextSelectedWaypoint",
                name: "Next Selected Waypoint",
                type: "line",
                smooth: false,
                animation: false,
                itemStyle: {
                    color: colorSelectedWaypoint,
                    borderColor: colorWaypoints,
                    borderWidth: 4,
                },
                symbol: "circle",
                symbolSize,
                data: [dataNextSelectedWaypoint],
                z: 7,
            },
            {
                id: "selectedWaypointSegment",
                name: "Selected Waypoint Segment",
                type: "line",
                smooth: false,
                animation: false,
                lineStyle: {
                    width: 5,
                    color: colorSelectedWaypoint,
                },
                itemStyle: {
                    color: colorSelectedWaypoint,
                    borderColor: colorWaypoints,
                    borderWidth: 4,
                },
                symbol: "circle",
                symbolSize,
                data: [dataSelectedWaypoint, dataNextSelectedWaypoint],
                z: 5,
            },
            {
                id: "vertiports",
                name: "Vertiports",
                type: "scatter",
                animation: false,
                itemStyle: {
                    color: colorWaypoints,
                    borderColor: colorWaypoints,
                    borderWidth: 4,
                    opacity: 1,
                },
                symbol: "circle",
                symbolSize,
                data: dataVertiports,
                z: 6,
            },
            {
                id: "ground",
                name: "Ground",
                type: "line",
                symbol: "none",
                lineStyle: {
                    width: 1,
                    color: colorGroundLine,
                },
                areaStyle: {
                    origin: "start",
                    color: colorGroundArea,
                },
                smooth: true,
                data: dataGround,
                z: 3,
            },
            {
                id: "obstacles",
                name: "Obstacles",
                type: "scatter",
                animation: false,
                itemStyle: {
                    opacity: 1,
                },
                symbol: graphObstacleIcon,
                symbolSize: 20,
                data: graphObstacles?.obstacles,
                z: 8,
            },
            {
                id: "highest_obstacle",
                name: "highest_obstacle",
                type: "scatter",
                animation: false,
                itemStyle: {
                    opacity: 1,
                },
                symbol: graphHighestObstacleIcon,
                symbolSize: 20,
                data: graphObstacles?.highest_obstacle,
                z: 9,
            },
        ],
    };
};

export type graphicEventFunctions = {
    onDrag?: () => void;
    ondragend?: () => void;
    onmousemove?: () => void;
    onmouseout?: () => void;
    onclick?: () => void;
};

export const graphicDraggable = (eventFunctions: graphicEventFunctions) => ({
    type: "circle",
    shape: { r: (symbolSize + 4) / 2 },
    invisible: true,
    draggable: true,
    ondrag: eventFunctions.onDrag,
    ondragend: eventFunctions.ondragend,
    onmousemove: eventFunctions.onmousemove,
    onmouseout: eventFunctions.onmouseout,
    onclick: eventFunctions.onclick,
    z: 100,
});

// preparation for voloport icons
export const graphicVoloport = (eventFunctions: graphicEventFunctions) => ({
    type: "circle",
    shape: { r: (symbolSize + 4) / 2 },
    onmousemove: eventFunctions.onmousemove,
    onmouseout: eventFunctions.onmouseout,
    onclick: eventFunctions.onclick,
    z: 8,
    invisible: true,
});
