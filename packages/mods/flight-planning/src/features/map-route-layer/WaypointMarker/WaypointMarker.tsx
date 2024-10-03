import { useToken } from "@volocopter/design-library-react";
import type { Marker } from "maplibre-gl";
import maplibreGL from "maplibre-gl";
import { useEffect, useMemo, useRef } from "react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useMapContext } from "@voloiq/map";

type WaypointMarkerProps = {
    waypoint: Waypoint;
    selected?: boolean;
    isNextWaypointSelected?: boolean;
    onDragEnd?: (marker: Marker, routeSequenceIndex: number) => void;
    onDrag?: (marker: Marker, routeSequenceIndex: number) => void;
    onClick?: (marker: Marker, routeSequenceIndex: number) => void;
    onDragStart?: (routeSequenceIndex: number) => void;
    draggable?: boolean;
    color: string;
    isFilled: boolean;
};

export const WaypointMarker: FCC<WaypointMarkerProps> = (props) => {
    const {
        waypoint,
        selected,
        isNextWaypointSelected,
        onDragEnd,
        onDrag,
        onDragStart,
        onClick,
        draggable = false,
        color,
        isFilled,
    } = props;
    const { map } = useMapContext();
    const brightBlue500 = useToken("colors", "brightBlue.500");
    const white = useToken("colors", "white");
    /* eslint-disable-next-line use-encapsulation/prefer-custom-hooks */
    const thisRef = useRef({
        props: { waypoint, selected, isNextWaypointSelected, onDragEnd, onDrag, onDragStart, onClick },
    });

    /* eslint-disable-next-line use-encapsulation/prefer-custom-hooks */
    const markerElement = useRef(document.createElement("div"));

    /* eslint-disable-next-line use-encapsulation/prefer-custom-hooks */
    const marker: Marker = useMemo(() => {
        const markerObject = new maplibreGL.Marker({ element: markerElement.current, draggable }).setLngLat([
            waypoint.lng,
            waypoint.lat,
        ]);

        markerObject.on("dragstart", () => thisRef.current.props.onDragStart?.(waypoint.routeSequenceIndex));
        markerObject.on("dragend", () => thisRef.current.props.onDragEnd?.(markerObject, waypoint.routeSequenceIndex));
        markerObject.on("drag", () => thisRef.current.props.onDrag?.(markerObject, waypoint.routeSequenceIndex));
        markerElement.current.addEventListener("click", (event: MouseEvent) => {
            thisRef.current.props.onClick?.(markerObject, waypoint.routeSequenceIndex);
            event.stopPropagation();
        });

        return markerObject;
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    /* eslint-disable-next-line use-encapsulation/prefer-custom-hooks */
    useEffect(() => {
        marker.setDraggable(draggable);
    }, [marker, draggable]);

    /* eslint-disable-next-line use-encapsulation/prefer-custom-hooks */
    useEffect(() => {
        if (map) marker.addTo(map);
        return () => {
            marker.remove();
        };
    }, [map, marker]);

    /* eslint-disable-next-line use-encapsulation/prefer-custom-hooks */
    useEffect(() => {
        markerElement.current.style.cursor = draggable ? "pointer" : "";
        markerElement.current.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8" fill="${
            selected ? brightBlue500 : isNextWaypointSelected ? brightBlue500 : isFilled ? color : white
        }" stroke="${color}" stroke-width="2"/>
        </svg>`;
        markerElement.current.dataset.testid = `waypoint-marker-${waypoint.routeSequenceIndex}`;
        // @ts-ignore TypeSccript doesn't know about the role attribute, but it actually exists
        markerElement.current.role = "img";
        markerElement.current.ariaLabel = waypoint.name;
        markerElement.current.style.zIndex = "2";
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [selected, isNextWaypointSelected]);

    return null;
};
