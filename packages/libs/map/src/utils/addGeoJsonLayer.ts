import { Feature, FeatureCollection } from "@turf/turf";
import type { FeatureLayoutOptions, FeaturePaintOptions, GeomType, LayerSpec, VoloiqMap } from "../components";

export const addGeoJsonLayer = (
    map: VoloiqMap,
    id: string,
    data: Feature | FeatureCollection,
    geomType: GeomType,
    layoutOptions?: FeatureLayoutOptions,
    paintOptions?: FeaturePaintOptions
) => {
    const sourceId = `${id}-source`;
    const layerId = `${id}-layer`;

    if (map.getSource(sourceId)) return;
    if (map.getLayer(layerId)) return;

    map.addSource(sourceId, {
        type: "geojson",
        data,
    });

    map.addLayer({
        id: layerId,
        source: sourceId,
        type: geomType,
        layout: layoutOptions,
        paint: paintOptions,
    } as LayerSpec);
};
