import { Waypoint, WaypointCreate, WaypointTransition, WaypointUpdate } from "./models";

export const anyWaypointCreate = (overwrites?: Partial<WaypointCreate>): Required<WaypointCreate> => ({
    alt: 150,
    lat: 41.829,
    lng: 12.301,
    name: "Unnamed",
    rnp: 0.2,
    routeSequenceIndex: 1,
    speed: 20.58,
    transitionRadius: 100,
    transitionType: WaypointTransition.flyBy,
    ...overwrites,
});

export const anyWaypointUpdate = (overwrites?: Partial<WaypointUpdate>): WaypointUpdate => ({
    alt: 150,
    altAboveRefAlt: 150,
    heading: 243,
    id: 1,
    lat: 41.829,
    lng: 12.301,
    name: "Unnamed",
    rnp: 0.2,
    routeSequenceIndex: 1,
    speed: 20.58,
    targetTimeOver: 127.015,
    transitionRadius: 100,
    transitionType: WaypointTransition.flyBy,
    ...overwrites,
});

export const anyWaypoint = (overwrites?: Partial<Waypoint>): Waypoint => ({
    alt: 150,
    altAboveRefAlt: 150,
    heading: 243,
    id: 1,
    lat: 41.85,
    lng: 12.36,
    name: "Unnamed",
    rnp: 0.2,
    routeSequenceIndex: 1,
    speed: 20.58,
    targetTimeOver: 127.015,
    transitionRadius: 100,
    transitionType: WaypointTransition.flyBy,
    ...overwrites,
});
