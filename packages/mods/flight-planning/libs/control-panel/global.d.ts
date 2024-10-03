// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../global.d.ts" />

type WaypointTransitionType = "fly-by" | "fly-over";

type Waypoint = {
    id: number;
    name: string;
    isVertiport: boolean;
    routeSequenceIndex: number;
    targetTimeOver: number;
    altAboveRefAlt: number;
    alt: number;
    lat: number;
    lng: number;
    transitionType: WaypointTransitionType;
    speed: number;
    heading: number;
    rnp: number;
    transitionRadius: number;
};

type RouteOption = {
    name: string;
    aircraftType: string;
};

type Route = {
    id: number;
    name: string;
    distance: number;
    duration: number;
    validationStatus: string;
};
