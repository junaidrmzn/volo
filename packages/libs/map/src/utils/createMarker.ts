import { Marker } from "maplibre-gl";

export const createMarker = (lat: number, lng: number, element?: HTMLElement) => {
    return new Marker({ element }).setLngLat({
        lng,
        lat,
    });
};
