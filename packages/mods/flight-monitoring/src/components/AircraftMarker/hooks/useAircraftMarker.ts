import type { LngLatLike } from "maplibre-gl";
import { Marker } from "maplibre-gl";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { useMapContext } from "@voloiq/map";
import { useAircraftCentering } from "./useAircraftCentering";

export const useAircraftMarker = (
    coords: LngLatLike,
    bearing: number,
    isCentered: boolean,
    setIsCentered: Dispatch<SetStateAction<boolean>>,
    setShowFlightPath: Dispatch<SetStateAction<boolean>>
) => {
    const { map, isReady } = useMapContext();
    useAircraftCentering(coords, isCentered, setIsCentered);

    useEffect(() => {
        if (!isReady) return () => {};
        const htmlMarker = document.createElement("div");
        htmlMarker.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" transform=rotate(${bearing}) viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-navigation-2"><polygon points="12 2 19 21 12 17 5 21 12 2"></polygon></svg>`;

        htmlMarker.style.cursor = "pointer";
        htmlMarker.addEventListener("click", (event: MouseEvent) => {
            map?.easeTo({ center: coords, zoom: map.getZoom() });
            setIsCentered(true);
            setShowFlightPath(true);
            event.stopPropagation();
        });

        const marker = new Marker({
            element: htmlMarker,
        })
            .setLngLat(coords)
            .addTo(map!);
        if (isCentered) map?.easeTo({ center: coords, zoom: map.getZoom() });
        htmlMarker.dataset.testid = `aircraft-marker`;
        return () => {
            marker.remove();
        };
    }, [isCentered, isReady, coords, map, setIsCentered, setShowFlightPath, bearing]);
};
