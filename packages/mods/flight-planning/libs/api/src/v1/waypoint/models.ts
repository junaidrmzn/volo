import { ArcSegment } from "../segment";

export type Waypoint = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    alt: number;
    altAboveRefAlt?: number;
    rnp: number;
    routeSequenceIndex: number;
    transitionType: WaypointTransitionType;
    transitionRadius: number;
    sarsId?: number;
    speed: number;
    heading: number;
    targetTimeOver: number;
    type?: "straight" | "turn";
    routeSegment?: ArcSegment;
    selected?: boolean;
    waypointType?: string;
    isVertiport?: boolean;
};

// enum for waypoint transition type
export const WaypointTransition = {
    flyBy: "fly-by",
    flyOver: "fly-over",
} as const;

export type WaypointTransitionType = typeof WaypointTransition[keyof typeof WaypointTransition];

export type WaypointCreate = {
    name: string;
    lat: number;
    lng: number;
    alt: number;
    speed: number;
    rnp: number;
    routeSequenceIndex: number;
    transitionType: WaypointTransitionType;
    transitionRadius: number;
};

export type WaypointUpdate = {
    alt?: number;
    altAboveRefAlt?: number;
    heading: number;
    id: number;
    lat: number;
    lng: number;
    name: string;
    rnp: number;
    routeSequenceIndex: number;
    speed: number;
    supportingCircle?: ArcSegment;
    targetTimeOver: number;
    transitionRadius: number;
    transitionType: WaypointTransitionType;
    type?: "straight" | "turn";
};
