import { Feature, FeatureCollection } from "@turf/turf";
import { LineLayerSpecification } from "maplibre-gl";

export type LayoutOptions = Pick<LineLayerSpecification, "layout">["layout"];
export type PaintOptions = Pick<LineLayerSpecification, "paint">["paint"];

export const addGeoJsonLine = (
    map: maplibregl.Map,
    id: string,
    data: Feature | FeatureCollection,
    layoutOptions?: LayoutOptions,
    paintOptions?: PaintOptions
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
        type: "line",
        source: sourceId,
        layout: layoutOptions,
        paint: paintOptions,
    });
};
