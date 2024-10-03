import type { Waypoint } from "@voloiq-typescript-api/flight-planning-types";

export const getCoordinates = (waypoints: Waypoint[]) => waypoints.map((wp) => [wp.lng, wp.lat]);
