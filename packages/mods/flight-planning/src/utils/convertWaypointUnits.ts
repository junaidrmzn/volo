import { Waypoint, WaypointUpdate } from "@voloiq/flight-planning-api/v1";
import { FEET_TO_METERS, KNOTS_TO_METERS_PER_SECOND, METERS_PER_SECOND_TO_KNOTS, METERS_TO_FEET } from ".";

export const convertWaypointUnitsForDisplay = (waypoint: Waypoint): Waypoint => ({
    ...waypoint,
    speed: +(waypoint.speed * METERS_PER_SECOND_TO_KNOTS).toFixed(2),
    alt: waypoint.alt ? waypoint.alt * METERS_TO_FEET : waypoint.alt,
    altAboveRefAlt: waypoint.altAboveRefAlt ? waypoint.altAboveRefAlt * METERS_TO_FEET : waypoint.altAboveRefAlt,
    // ... add more conversions here if needed
});

export const convertWaypointUnitsToSiUnits = (waypoint: Waypoint): Waypoint => ({
    ...waypoint,
    speed: +(waypoint.speed * KNOTS_TO_METERS_PER_SECOND).toFixed(2),
    alt: waypoint.alt ? waypoint.alt * FEET_TO_METERS : waypoint.alt,
    altAboveRefAlt: waypoint.altAboveRefAlt ? waypoint.altAboveRefAlt * FEET_TO_METERS : waypoint.altAboveRefAlt,
    // ... add more conversions here if needed
});

export const convertWaypointUpdateDataUnitsToSiUnits = (waypoint: WaypointUpdate): WaypointUpdate => ({
    ...waypoint,
    speed: +(waypoint.speed * KNOTS_TO_METERS_PER_SECOND).toFixed(2),
    alt: waypoint.alt ? waypoint.alt * FEET_TO_METERS : undefined,
    altAboveRefAlt: waypoint.altAboveRefAlt ? waypoint.altAboveRefAlt * FEET_TO_METERS : waypoint.altAboveRefAlt,
    // ... add more conversions here if needed
});
