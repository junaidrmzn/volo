import { FeatureLayoutOptions, FeaturePaintOptions, returnVoloiqMap, useMapContext } from "@voloiq/map";

const outlineCorridorLayoutOptions = () => {
    const featureLayout: { layout?: FeatureLayoutOptions; paint?: FeaturePaintOptions } = {};
    featureLayout.paint = {
        "line-dasharray": [2, 2, 0],
        "line-color": "#F9A039",
        "line-width": 3,
    };
    return featureLayout;
};

const corridorFillLayoutOptions = () => {
    const featureLayout: { layout?: FeatureLayoutOptions; paint?: FeaturePaintOptions } = {};
    featureLayout.paint = {
        "fill-opacity": 0.3,
        "fill-color": "#F9C339",
    };
    return featureLayout;
};

export const useRouteCorridorLayer = () => {
    const { map } = useMapContext();
    const currentMap = returnVoloiqMap(map);
    if (!currentMap.getLayer("corridor-outline")) {
        const outlineCorridorLayerLayout = outlineCorridorLayoutOptions();
        const fillCorridorLayerLayout = corridorFillLayoutOptions();
        currentMap.addLayerToMap?.(
            currentMap,
            {
                id: "corridor-outline",
                type: "line",
                source: "corridor-source",
                paint: outlineCorridorLayerLayout?.paint,
            },
            "geojson"
        );
        currentMap.addLayerToMap?.(
            currentMap,
            { id: "corridor-fill", type: "fill", source: "corridor-source", paint: fillCorridorLayerLayout?.paint },
            "geojson"
        );
    }
};
