import { useState } from "react";

export const useWaypointItem = () => {
    const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);

    const onWaypointSelect = (selectedWaypoint: Waypoint) => {
        setSelectedWaypoint(selectedWaypoint);
    };

    const onWaypointDeselect = () => {
        setSelectedWaypoint(null);
    };

    return { selectedWaypoint, onWaypointSelect, onWaypointDeselect };
};
