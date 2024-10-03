import type { AirspaceIntersections } from "@voloiq-typescript-api/flight-planning-types/dist";
import type { SeriesOption } from "echarts";
import { getInstanceByDom } from "echarts";
import type { RefObject } from "react";
import { useEffect } from "react";
import { filterAirspaceIntersectionsBySelectedOptionsAndRange } from "./filterAirspaceIntersections";
import { formatAirspaceIntersectionData } from "./formatAirspaceIntersectionData";
import type { AirspaceOption } from "./types";

type AirspacesInVerticalProfileOptions = {
    chartRef: RefObject<HTMLDivElement>;
    routeAltitudeData: number[][];
    showAirspaces: boolean;
    airspacesAltitudeRange: [number, number];
    selectedAirspaceOptions: AirspaceOption[];
    airspaceIntersections?: AirspaceIntersections[];
};

export const useAirspacesInVerticalProfile = (options: AirspacesInVerticalProfileOptions) => {
    const {
        chartRef,
        routeAltitudeData,
        showAirspaces,
        airspacesAltitudeRange,
        selectedAirspaceOptions,
        airspaceIntersections,
    } = options;
    // effect hook to remove airspaces series if showAirspaces toggle is switched off
    useEffect(() => {
        if (showAirspaces) return;
        if (!chartRef.current) return;
        const chart = getInstanceByDom(chartRef.current);
        if (!chart) return;
        const { series } = chart.getOption();
        if (!Array.isArray(series)) return;
        const seriesToRemove = series.filter((series: SeriesOption) => series.id?.toString().startsWith("airspace"));
        for (const seriesToRem of seriesToRemove) {
            chart.setOption({ series: { id: seriesToRem.id, data: [] } });
        }
    }, [chartRef, showAirspaces]);
    // update airspaces in the vertical profile and remove unused ones.
    useEffect(() => {
        if (!showAirspaces) return;
        if (!chartRef.current) return;
        const chart = getInstanceByDom(chartRef.current);
        if (!chart || !routeAltitudeData || !airspaceIntersections) return;

        let airspaceSeriesIds: (string | undefined)[] = [];
        const { series } = chart.getOption();
        if (Array.isArray(series)) {
            const seriesIds = series.map((series: SeriesOption) => series.id?.toString());
            if (seriesIds) {
                airspaceSeriesIds = seriesIds;
            }
        }
        // Filter airspaceIntersections for altitude range and type
        const filteredAirspaceIntersections = filterAirspaceIntersectionsBySelectedOptionsAndRange(
            airspaceIntersections,
            selectedAirspaceOptions,
            airspacesAltitudeRange
        );

        const intersectionIds = new Set(
            filteredAirspaceIntersections.map((intersection: AirspaceIntersections) => intersection.externalId)
        );
        // Remove all airspace series which are not included in the result set anymore.
        for (const seriesId of airspaceSeriesIds) {
            // Only remove series which start with "airspace" prefix and are not included in the response anymore.
            if (seriesId?.startsWith("airspace") && !intersectionIds.has(seriesId.slice("airspace-".length))) {
                chart.setOption({ series: { id: seriesId, data: [] } });
            }
        }

        // Add new airspace series
        chart.setOption({
            series: [...formatAirspaceIntersectionData(routeAltitudeData, filteredAirspaceIntersections)],
        });
    }, [
        airspaceIntersections?.length,
        airspaceIntersections,
        chartRef,
        routeAltitudeData,
        routeAltitudeData.length,
        selectedAirspaceOptions,
        airspacesAltitudeRange,
        showAirspaces,
    ]);
};
