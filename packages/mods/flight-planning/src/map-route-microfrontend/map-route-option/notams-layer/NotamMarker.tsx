/* eslint-disable use-encapsulation/prefer-custom-hooks */
import { Marker, Popup } from "maplibre-gl";
import { useEffect, useMemo, useRef } from "react";
import { useMapContext } from "@voloiq/map";

export type NotamMarkerProps = {
    latitude: number;
    longitude: number;
    description: string;
    id: string;
};

export const NotamMarker: FCC<NotamMarkerProps> = (props) => {
    const { latitude, longitude, description, id } = props;
    const { map } = useMapContext();

    const markerElement = useRef(document.createElement("div"));

    const marker = useMemo(() => {
        const popup = new Popup({ offset: 25 }).setText(description);
        return new Marker({ element: markerElement.current }).setLngLat([longitude, latitude]).setPopup(popup);
    }, [latitude, longitude, description]);

    useEffect(() => {
        if (map) marker.addTo(map);
        return () => {
            marker.remove();
        };
    }, [map, marker]);

    useEffect(() => {
        markerElement.current.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2"/>
        <text x="50%" y="50%" text-anchor="middle" stroke="#000" stroke-width="1px" dy=".3em">⚠️</text>
        </svg>`;
        markerElement.current.dataset.testid = `notam-marker-${id}`;
    }, [id]);

    return null;
};
