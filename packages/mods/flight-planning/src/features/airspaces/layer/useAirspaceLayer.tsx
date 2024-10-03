import { useEffect } from "react";
import { useGetAirspaces } from "@voloiq/flight-planning-api/v1";
import { GeoJsonSource, VoloiqMap, isVoloiqMap, useMapContext, useMapEvent } from "@voloiq/map";
import { useSelectedRoute } from "../../selected-route";
import { filterAirspacesByRangeAndType } from "../list/filterAirspaces";
import type { Option } from "../types";

type useAirspaceLayerProps = {
    altitudeRange: [number, number];
    selectedAirspaceOptions: Option[];
    isSatellite: Boolean;
};

export const useAirspaceLayer = (props: useAirspaceLayerProps) => {
    const { altitudeRange, selectedAirspaceOptions, isSatellite } = props;
    const AIRSPACE_SOURCE = "airspace-source";

    const { map, isReady } = useMapContext();
    const { routeOptionId } = useSelectedRoute();
    const { data: airspacesList } = useGetAirspaces(routeOptionId);

    const loadAirspaceData = (map: VoloiqMap) => {
        // Determine the layer to insert the airspace layer below
        const findLayerToInsert = (map: VoloiqMap) => {
            const allLayers = map.getStyle().layers;
            // Find the first layer whose id includes "displayed-route"
            const layerToInsert = allLayers.find((layer) => layer.id.includes("displayed-route"));
            // If a matching layer is found, return its id
            if (layerToInsert) {
                return layerToInsert.id;
            }
            // If no matching layer is found and the map is not in satellite view, return the id of the last layer
            if (!isSatellite) {
                return allLayers[allLayers.length - 1]?.id;
            }
            // return the id of the second layer
            return allLayers[1]?.id;
        };

        if (!airspacesList?.data?.features) return;

        // Filter airspaces by  selected optiosn (altitude range, type and class)
        const filteredAirspaces = filterAirspacesByRangeAndType(
            altitudeRange,
            selectedAirspaceOptions,
            airspacesList.data
        );

        // Check if the layer source already exists
        const mapLayerSource = map.getSource("airspace-source");
        if (mapLayerSource && Object.keys(mapLayerSource).length > 0) return;

        // Get the layer id to insert the airspace layer
        const layerId = findLayerToInsert(map);
        /*
                This layer creates the outline of the airspaces with a filter to exclude CTR and A classifications.
                The outline will be colored blue unless it is of type A, in which case it will be red.
            */
        if (map) {
            map.addLayerToMap?.(
                map,
                {
                    id: "airspace-outline",
                    type: "line",
                    source: AIRSPACE_SOURCE,
                    filter: ["all", ["!=", ["get", "type"], "CTR"], ["!=", ["get", "classification"], "A"]],
                    layout: { visibility: "visible" },
                    paint: {
                        "line-color": [
                            "match",
                            ["get", "type"],
                            "A",
                            "red",
                            "ALRT",
                            "red",
                            "D",
                            "transparent",
                            "DGR",
                            "transparent",
                            "R",
                            "transparent",
                            "RESTR",
                            "transparent",
                            "P",
                            "transparent",
                            "PRHB",
                            "transparent",
                            /* other */ "blue",
                        ],
                        "line-width": 15,
                        "line-opacity": 0.2,
                    },
                },
                "geojson",
                filteredAirspaces,
                layerId
            );

            // Creates the red outline for A classifications only
            map.addLayerToMap?.(
                map,
                {
                    id: "airspace-outline-red",
                    type: "line",
                    source: AIRSPACE_SOURCE,
                    filter: ["==", ["get", "classification"], "A"],
                    layout: { visibility: "visible" },
                    paint: {
                        "line-color": [
                            "match",
                            ["get", "type"],
                            "TMA",
                            "blue",
                            ["match", ["get", "classification"], "A", "red", "ALRT", "red", /* other */ "transparent"],
                        ],
                        "line-width": 15,
                        "line-opacity": 0.1,
                    },
                },
                "geojson",
                filteredAirspaces,
                layerId
            );

            // Creates the dashed blue outline for CTR classifications only.
            map.addLayerToMap?.(
                map,
                {
                    id: "airspace-dashed-outline",
                    type: "line",
                    source: AIRSPACE_SOURCE,
                    filter: ["==", ["get", "type"], "CTR"],
                    layout: { visibility: "visible" },
                    paint: {
                        "line-color": "blue",
                        "line-width": 8,
                        "line-dasharray": ["literal", [1, 1]],
                        "line-opacity": 0.2,
                    },
                },
                "geojson",
                filteredAirspaces,
                layerId
            );

            // Creates the fill for D, R, and P types only.
            map.addLayerToMap?.(
                map,
                {
                    id: "airspace-restricted-fill",
                    type: "fill",
                    source: AIRSPACE_SOURCE,
                    paint: {
                        "fill-color": [
                            "match",
                            ["get", "type"],
                            "D",
                            "red",
                            "DGR",
                            "red",
                            "R",
                            "red",
                            "RESTR",
                            "red",
                            "P",
                            "red",
                            "PRHB",
                            "red",
                            /* other */ "transparent",
                        ],
                        "fill-opacity": 0.2,
                    },
                },
                "geojson",
                filteredAirspaces,
                layerId
            );

            /*

                Creates the tag labels for the airspace features. It uses a text-field to match the classification of airspace and uses the type if no match is found.
                The labels will be placed along the line of the airspace.

                */
            map.addLayerToMap?.(
                map,
                {
                    id: "airspace-tag",
                    type: "symbol",
                    source: AIRSPACE_SOURCE,
                    layout: {
                        "text-field": [
                            "match",
                            ["get", "type"],
                            "TMA",
                            "TMA",
                            [
                                "match",
                                ["get", "classification"],
                                "A",
                                "A",
                                "B",
                                "B",
                                "C",
                                "C",
                                /* other */ ["get", "type"],
                            ],
                        ],
                        "symbol-placement": "line",
                        "text-pitch-alignment": "map",
                        "text-rotation-alignment": "map",
                        "text-size": 36,
                    },
                },
                "geojson",
                filteredAirspaces,
                layerId
            );

            // Like above but just displays type OTHERS:MOA as MOA on map
            map.addLayerToMap?.(
                map,
                {
                    id: "airspace-tag-others",
                    type: "symbol",
                    filter: ["==", ["get", "type"], "OTHER:MOA"],
                    source: AIRSPACE_SOURCE,
                    layout: {
                        "text-field": ["match", ["get", "type"], "OTHER:MOA", "MOA", /* other */ ["get", "type"]],
                        "symbol-placement": "line",
                        "text-pitch-alignment": "map",
                        "text-rotation-alignment": "map",
                        "text-size": 36,
                    },
                },
                "geojson",
                filteredAirspaces,
                layerId
            );
        }
    };

    useEffect(() => {
        if (!airspacesList?.data?.features || !isReady || !map) return () => {};
        loadAirspaceData(map);
        return () => {
            if (map.getLayer("airspace-restricted-fill") && isVoloiqMap(map))
                (map as VoloiqMap).removeMapLayer?.(map, "airspace", AIRSPACE_SOURCE, [
                    "airspace-restricted-fill",
                    "airspace-outline",
                    "airspace-outline-red",
                    "airspace-dashed-outline",
                    "airspace-tag",
                    "airspace-tag-others",
                ]);
        };
    }, [altitudeRange, selectedAirspaceOptions, isReady, airspacesList]);

    /**
     * update airspace drawing by change of map style
     */

    useMapEvent("render", () => {
        if (!map) return;
        const filteredAirspaces = filterAirspacesByRangeAndType(
            altitudeRange,
            selectedAirspaceOptions,
            airspacesList?.data
        );
        // Check if the layer source already exists
        const mapLayerSource = map.getSource("airspace-source") as GeoJsonSource;
        if (mapLayerSource && Object.keys(mapLayerSource).length > 0) return;
        if (isVoloiqMap(map)) (map as VoloiqMap).updateSourceData?.(map, filteredAirspaces, "airspace-source");
    });

    return null;
};
