import { FeatureCollection, Geometry } from "@turf/turf";
import { isNumber } from "lodash";
import { useEffect } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import {
    FeatureLayoutOptions,
    FeaturePaintOptions,
    GeomType,
    LineCapTypes,
    LineJoinTypes,
    RouteType,
    VoloiqMap,
    returnVoloiqMap,
    useMapContext,
    useMapEvent,
} from "@voloiq/map";
import { generateRouteCorridor } from "./routeBuffer";

const defaultRouteCoordinatesFilter = (coordinates: FeatureCollection<Geometry>) => {
    return coordinates;
};

const createLayoutOptions = (
    type: GeomType,
    routeType: RouteType,
    routeColor?: string,
    width?: number,
    opacity?: number
) => {
    const featureLayout: { layout?: FeatureLayoutOptions; paint?: FeaturePaintOptions } = {};
    if (type === "line") {
        const lineDashArray = routeType === "template" ? [1, 1.5] : [1];
        const lineWidth = width && width > 0 ? width : 10; // pixels
        const lineOpacity = opacity && opacity > 0 ? opacity : 0.8;
        featureLayout.layout = { "line-join": "round" as LineJoinTypes, "line-cap": "round" as LineCapTypes };
        featureLayout.paint = {
            "line-color": routeColor,
            "line-opacity": lineOpacity,
            "line-width": lineWidth,
            "line-dasharray": lineDashArray,
        };
    }
    return featureLayout;
};

const getIdFromLayerId = (routeString: string) => {
    const regex = /\d+/;
    const match = routeString.match(regex);
    if (match && match[0]) return Number(match[0]);
    return null;
};

const removeSelectedLayer = (map: VoloiqMap, layerId: string) => {
    const routeId = getIdFromLayerId(layerId);
    const layerName = `route-layer-${routeId}-layer`;
    const routeName = `route-layer-${routeId}`;
    if (map.getLayer(layerName)) {
        map.removeMapLayer?.(map, routeName);
    }
};

type UseDisplayRouteOptions = {
    greatCircleCoordinates: FeatureCollection<Geometry>;
    layerId: number | string;
    routeColor: string;
    routeType: RouteType;
    isWaypointEditable?: boolean;
    width?: number;
    opacity?: number;
    routeCoordinatesFilter?: (coordinates: FeatureCollection<Geometry>) => FeatureCollection<Geometry>;
    isLoading?: boolean;
};

export const useDisplayRoute = (options: UseDisplayRouteOptions) => {
    const {
        greatCircleCoordinates,
        layerId,
        routeColor,
        routeType,
        isWaypointEditable,
        width,
        opacity,
        routeCoordinatesFilter = defaultRouteCoordinatesFilter,
        isLoading,
    } = options;
    const { map, isReady } = useMapContext();
    const currentMap = returnVoloiqMap(map);
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const vfp1311 = isFeatureFlagEnabled("vfp-1311");

    /** initial draw route on map */
    useEffect(() => {
        if (!isReady || !currentMap) return () => {};
        const routeId = isNumber(layerId) ? JSON.stringify(layerId) : layerId;
        const layerLayout = createLayoutOptions("line", routeType, routeColor, width, opacity);
        currentMap.addLayerToMap?.(
            currentMap,
            { id: routeId, type: "line", source: "", layout: layerLayout?.layout, paint: layerLayout?.paint },
            "geojson"
        );
        if (routeType === "displayed") {
            removeSelectedLayer(currentMap, `${layerId}`);
            currentMap.removeMapLayer?.(currentMap, "waypoints");
            currentMap.removeMapLayer?.(currentMap, "corridor-outline", "corridor-source", [
                "corridor-outline",
                "corridor-fill",
            ]);
            currentMap.removeMapLayer?.(currentMap, "obstacles-layer", "obstacles-source", [
                "obstacles-layer",
                "obstacles-buffer-layer",
            ]);
        }

        return () => {
            currentMap.removeMapLayer?.(currentMap, `${layerId}`);
            currentMap.removeMapLayer?.(currentMap, "waypoints");
            currentMap.removeMapLayer?.(currentMap, "corridor-outline", "corridor-source", [
                "corridor-outline",
                "corridor-fill",
            ]);
            currentMap.removeMapLayer?.(currentMap, "obstacles-layer", "obstacles-source", [
                "obstacles-layer",
                "obstacles-buffer-layer",
            ]);
        };
    }, [routeColor, isReady, layerId, map, routeType, width, opacity]);

    /** update source data with great circle coordinates for route */
    useEffect(() => {
        if (!isReady || !currentMap) return;
        if (currentMap.updateRouteLayer) {
            const filteredCoordinates = routeCoordinatesFilter(greatCircleCoordinates);
            if (routeType === "selected" && filteredCoordinates.features.length > 0) {
                currentMap.updateLayer?.(currentMap, filteredCoordinates, layerId);
                currentMap.updateRouteLayer = false;
                if (vfp1311) generateRouteCorridor(filteredCoordinates, currentMap);
            }
        }
    }, [layerId, greatCircleCoordinates, isReady, map, routeCoordinatesFilter]);

    /** update route drawing by change of map style */
    useMapEvent("styledata", () => {
        if (!currentMap) return;
        const filteredCoordinates = routeCoordinatesFilter(greatCircleCoordinates);
        const layerLayout = createLayoutOptions("line", routeType, routeColor, width, opacity);
        if (!currentMap.getLayer(JSON.stringify(layerId)))
            currentMap.addLayerToMap?.(
                currentMap,
                {
                    id: `${layerId}`,
                    type: "line",
                    source: "",
                    layout: layerLayout?.layout,
                    paint: layerLayout?.paint,
                },
                "geojson"
            );
        currentMap.updateLayer?.(currentMap, filteredCoordinates, layerId);
    });

    /** update pointer when switching mapActionMode */
    useEffect(() => {
        if (!map || !isWaypointEditable || routeType === "template") return;

        const setCursor = () => {
            map.getCanvas().style.cursor = isLoading ? "wait" : routeType === "displayed" ? "pointer" : "crosshair";
        };

        (map as maplibregl.Map).on("mouseover", `${layerId}-layer`, setCursor);
        (map as maplibregl.Map).on("mouseleave", `${layerId}-layer`, () => {
            map.getCanvas().style.cursor = "";
        });

        setCursor();
    }, [layerId, map, routeType, isWaypointEditable, isLoading]);
};
