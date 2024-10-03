import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useNonDraggableWaypointMarker } from "../hooks/useNonDraggableWaypointMarker";

type NonDraggableWaypointMarkerProps = {
    waypoint: Waypoint;
    onClick?: () => void;
    color?: string;
    isFilled?: boolean;
};

export const NonDraggableWaypointMarker = (props: NonDraggableWaypointMarkerProps) => {
    const { waypoint, onClick, color, isFilled } = props;
    useNonDraggableWaypointMarker(waypoint, onClick, color, isFilled);
    return null;
};
