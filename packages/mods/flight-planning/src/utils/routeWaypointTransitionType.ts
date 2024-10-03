import { Waypoint } from "@voloiq/flight-planning-api/v1";

export const getWaypointTransitionTypeSelectOption = (waypoint: Waypoint) => {
    return {
        value: waypoint.transitionType,
    };
};
