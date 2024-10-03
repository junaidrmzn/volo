import { Marker } from "maplibre-gl";
import { useEffect } from "react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useMapContext } from "@voloiq/map";

export const useNonDraggableWaypointMarker = (
    waypoint: Waypoint,
    onClick?: () => void,
    color: string = "#00143C",
    isFilled: boolean = false
) => {
    const { map, isReady } = useMapContext();

    useEffect(() => {
        if (!isReady) return () => {};
        const htmlMarker = document.createElement("div");
        htmlMarker.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8" fill="${isFilled ? color : "#FFFFFF"}" stroke="${color}" stroke-width="2"/>
        </svg>`;

        if (typeof onClick !== "undefined") {
            htmlMarker.style.cursor = "pointer";
            htmlMarker.addEventListener("click", (event: MouseEvent) => {
                onClick();
                event.stopPropagation();
            });
        } else {
            htmlMarker.style.cursor = "";
        }

        const marker = new Marker({
            element: htmlMarker,
        })
            .setLngLat([waypoint.lng, waypoint.lat])
            .addTo(map!);
        htmlMarker.dataset.testid = `non-draggable-waypoint-marker-${waypoint.routeSequenceIndex}`;
        htmlMarker.style.zIndex = "1";
        return () => {
            marker.remove();
        };
    }, [isReady, map, waypoint, onClick, isFilled, color]);
};
