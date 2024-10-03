import { Waypoint, WaypointUpdate } from "@voloiq/flight-planning-api/v1";

export const sortWaypointsOnRouteByRouteSequenceIndex = (a: Waypoint | WaypointUpdate, b: Waypoint | WaypointUpdate) =>
    a.routeSequenceIndex < b.routeSequenceIndex ? -1 : a.routeSequenceIndex > b.routeSequenceIndex ? 1 : 0;
