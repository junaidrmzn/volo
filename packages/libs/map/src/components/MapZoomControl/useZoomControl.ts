import type { Map } from "maplibre-gl";

export const useZoomControl = (map?: Map) => {
    const zoomRate = 0.5;

    const zoomIn = () => {
        if (!map) return;

        if (map.transform.zoom + zoomRate <= map.transform.maxZoom) {
            map.easeTo({ zoom: map.transform.zoom + zoomRate });
        }
    };

    const zoomOut = () => {
        if (!map) return;

        if (map.transform.zoom - zoomRate >= map.transform.minZoom) {
            map.easeTo({ zoom: map.transform.zoom - zoomRate });
        }
    };
    return { zoomIn, zoomOut };
};
