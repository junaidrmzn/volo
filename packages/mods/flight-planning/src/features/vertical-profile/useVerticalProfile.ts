import { useColorModeValue } from "@volocopter/design-library-react";
import * as echarts from "echarts";
import { getInstanceByDom } from "echarts";
import { useCallback, useEffect, useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Route, useGetAirspaceIntersections, useGetAirspaces } from "@voloiq/flight-planning-api/v1";
import { useChart } from "@voloiq/graph";
import { VoloiqMapStoreType, deselectAllWaypoints } from "@voloiq/map";
import { colors } from "../../utils";
import { useSegmentEditingContext } from "../map-route-layer/segment-editing";
import { useAirspacesInVerticalProfile } from "./airspaces";
import type { AirspaceOption } from "./airspaces/types";
import { useObstacleClearanceCorridor } from "./obstacle-clearance-corridor";
import { useTerrainDataInVerticalProfile } from "./terrain";
import { useCorridorClearanceDataInVerticalProfile } from "./terrain/useCorridorClearanceDataInVerticalProfile";
import { useChangeAltitude } from "./useChangeAltitude";
import { useRouteAltitudeData } from "./useRouteAltitudeData";
import { graphicDraggable, graphicVoloport, verticalProfileLayout } from "./verticalProfileLayout";

const showTooltip = (chart: echarts.ECharts, dataIndex: number) => {
    chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex,
    });
};

const hideTooltip = (chart: echarts.ECharts) => {
    chart.dispatchAction({
        type: "hideTip",
    });
};

const updatePointData = (chart: echarts.ECharts, currentData: number[][], dataIndex: number, yPixelPoint: number) => {
    const yRange = { min: 0, max: 5000 };

    if (dataIndex === 0 || dataIndex === currentData.length - 1) {
        return;
    }

    const updatedData = currentData;
    const y: number = Math.round(chart.convertFromPixel({ yAxisIndex: 0 }, yPixelPoint));
    if (y < yRange.min) {
        updatedData[dataIndex]![1] = yRange.min;
    } else if (y > yRange.max) {
        updatedData[dataIndex]![1] = yRange.max;
    } else {
        updatedData[dataIndex]![1] = y;
    }
    chart.setOption({
        series: [
            {
                id: "waypoints",
                data: updatedData,
            },
            {
                id: "selectedWaypoint",
                data: [updatedData[dataIndex]],
            },
        ],
    });
};

type point = {
    y: number;
};

const addDraggableOverlay = (
    chart: echarts.ECharts,
    data: number[][],
    setWaypoint: (index: number, newAlt: number) => void,
    setSelectedWaypointIndex: (index: number) => void,
    voloiqMapStore?: VoloiqMapStoreType
) => {
    function onPointDragging(this: point, dataIndex: number) {
        setSelectedWaypointIndex(dataIndex);
        updatePointData(chart, data, dataIndex, this.y);
    }

    const addGraphic = () => {
        const points = data.map((item: number[], dataIndex: number) => {
            if (dataIndex === 0 || dataIndex === data.length - 1) {
                return {
                    position: chart.convertToPixel("grid", item),
                    ...graphicVoloport({
                        onmousemove: echarts.util.curry(showTooltip, chart, dataIndex),
                        onmouseout: echarts.util.curry(hideTooltip, chart),
                        onclick: () => {
                            deselectAllWaypoints(voloiqMapStore?.map, dataIndex);
                            setSelectedWaypointIndex(dataIndex);
                        },
                    }),
                };
            }
            return {
                position: chart.convertToPixel("grid", item),
                ...graphicDraggable({
                    onDrag: echarts.util.curry(onPointDragging, dataIndex),
                    ondragend: () => {
                        addDraggableOverlay(chart, data, setWaypoint, setSelectedWaypointIndex, voloiqMapStore);
                        setWaypoint(dataIndex, item[1]!);
                        hideTooltip(chart);
                    },
                    onmousemove: echarts.util.curry(showTooltip, chart, dataIndex),
                    onmouseout: echarts.util.curry(hideTooltip, chart),
                    onclick: () => {
                        deselectAllWaypoints(voloiqMapStore?.map, dataIndex);
                        setSelectedWaypointIndex(dataIndex);
                    },
                }),
            };
        });
        chart.setOption({
            graphic: points,
        });
    };

    addGraphic();
};

type VerticalProfileOptions = {
    selectedWaypointIndex: number | undefined;
    setSelectedWaypointIndex: (index: number) => void;
    selectedRoute: Route;
    showAirspaces: boolean;
    airspacesAltitudeRange: [number, number];
    selectedAirspaceOptions: AirspaceOption[];
    voloiqMapStore?: VoloiqMapStoreType;
};

export const useVerticalProfile = (options: VerticalProfileOptions) => {
    const {
        selectedRoute,
        showAirspaces,
        selectedWaypointIndex,
        setSelectedWaypointIndex,
        airspacesAltitudeRange,
        selectedAirspaceOptions,
        voloiqMapStore,
    } = options;

    const colorWaypoints = useColorModeValue(colors.blue[300], colors.white);
    const fontColor = useColorModeValue(colors.blue[500], colors.white);
    const bGColorTooltip = useColorModeValue(colors.white, colors.gray[900]);

    const { isSuccess } = useGetAirspaces(selectedRoute.routeOptionId);
    const airspaceIntersectionsQuery = useGetAirspaceIntersections(selectedRoute.id, isSuccess && showAirspaces);

    const { routeAltitudeData, endDistance } = useRouteAltitudeData(voloiqMapStore);
    const { terrainData } = useTerrainDataInVerticalProfile(selectedRoute.id, endDistance);
    const { handleAltitudeChange } = useChangeAltitude({ routeId: selectedRoute.id, voloiqMapStore });

    const { segmentEditMode } = useSegmentEditingContext();
    const { obstaclesGraphData } = useCorridorClearanceDataInVerticalProfile(selectedRoute.id);

    const isEditingArcSegment = segmentEditMode !== "none";

    const verticalObstacleClearance = selectedRoute.routeEnergySettings?.verticalObstacleClearance;

    const option = useMemo(
        () =>
            verticalProfileLayout(
                routeAltitudeData,
                terrainData,
                colorWaypoints,
                fontColor,
                bGColorTooltip,
                selectedWaypointIndex ? (routeAltitudeData[selectedWaypointIndex] as number[]) : [],
                isEditingArcSegment && selectedWaypointIndex
                    ? (routeAltitudeData[selectedWaypointIndex + 1] as number[])
                    : [],
                obstaclesGraphData
            ),
        [
            routeAltitudeData,
            terrainData,
            colorWaypoints,
            fontColor,
            bGColorTooltip,
            selectedWaypointIndex,
            isEditingArcSegment,
            obstaclesGraphData,
        ]
    );
    const chartRef = useChart(option, []);

    const isAuthEditVerticalProfile = useIsAuthorizedTo(["update"], ["Waypoint"]);

    const addGraphicLayer = useCallback(() => {
        if (!chartRef.current) return;
        const chart = getInstanceByDom(chartRef.current);
        if (chart) {
            chart.off("dataZoom");
            chart.on("dataZoom", addGraphicLayer);
            if (isAuthEditVerticalProfile) {
                addDraggableOverlay(
                    chart,
                    routeAltitudeData,
                    handleAltitudeChange,
                    setSelectedWaypointIndex,
                    voloiqMapStore
                );
            }
        }
    }, [
        chartRef,
        option,
        routeAltitudeData,
        handleAltitudeChange,
        setSelectedWaypointIndex,
        obstaclesGraphData,
        voloiqMapStore,
    ]);

    // Re-render if e.g. the browser's zoom function is used
    useEffect(() => {
        window.addEventListener("resize", addGraphicLayer);
        return () => {
            window.removeEventListener("resize", addGraphicLayer);
        };
    });

    // focus on coordinate if it's not already visible
    const focusOnCoordinate = useCallback(
        (xCoordinate: number) => {
            if (!chartRef.current) return;
            const chart = getInstanceByDom(chartRef.current);
            if (!chart) return;

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            const currentChartDataZoom: echarts.DataZoomComponentOption[] = chart.getOption()
                .dataZoom as echarts.DataZoomComponentOption[];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            const leftZoomBorder: number = currentChartDataZoom[0]!.startValue! as number;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            const rightZoomBorder: number = currentChartDataZoom[0]!.endValue! as number;

            if (leftZoomBorder < xCoordinate && xCoordinate < rightZoomBorder) return;
            const currentZoomRange: number = rightZoomBorder - leftZoomBorder;

            chart.setOption({
                dataZoom: {
                    startValue: xCoordinate - currentZoomRange / 2,
                    endValue: xCoordinate + currentZoomRange / 2,
                },
            });
        },
        [chartRef]
    );
    useAirspacesInVerticalProfile({
        chartRef,
        routeAltitudeData,
        showAirspaces,
        airspacesAltitudeRange,
        selectedAirspaceOptions,
        airspaceIntersections: airspaceIntersectionsQuery.data,
    });
    useObstacleClearanceCorridor({
        chartRef,
        routeAltitudes: routeAltitudeData,
        verticalObstacleClearance,
    });
    // reset position of graphical layer and focus on selected waypoint if possible
    useEffect(() => {
        if (selectedWaypointIndex !== undefined && selectedWaypointIndex < routeAltitudeData.length) {
            const selectedWaypointX: number = routeAltitudeData[selectedWaypointIndex]![0]!;
            focusOnCoordinate(selectedWaypointX);
        }
        addGraphicLayer();
    }, [selectedWaypointIndex, chartRef, routeAltitudeData, focusOnCoordinate, addGraphicLayer]);

    return { chartRef, isLoading: airspaceIntersectionsQuery.isLoading };
};
