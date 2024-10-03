import { useState } from "react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";

export const useAltitudeReferenceSelect = () => {
    const [isRefAltitudeSelected, setIsRefAltitudeSelected] = useState(false);

    const getWaypointAltitudeReferenceFormValues = (waypoint: Waypoint) => {
        return {
            ...waypoint,
            ...(isRefAltitudeSelected ? { altitudeValue: waypoint.altAboveRefAlt } : { altitudeValue: waypoint.alt }),
        };
    };

    return { isRefAltitudeSelected, setIsRefAltitudeSelected, getWaypointAltitudeReferenceFormValues };
};
