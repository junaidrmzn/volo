import { Feature, FeatureCollection } from "@turf/turf";

export const updateGeoJsonMapLayer = (map: maplibregl.Map, id: string, data: Feature | FeatureCollection) => {
    const sourceId = `${id}-source`;

    const source = map.getSource(sourceId);
    if (!source) return;

    if (source.type === "geojson") {
        // @ts-ignore
        // TODO: this will be fixed when updating to maplibre gl v3.3.1
        source.setData(data);
    }
};
