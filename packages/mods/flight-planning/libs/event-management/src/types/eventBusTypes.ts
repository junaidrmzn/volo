export type HandlerType<T> = (eventData: T) => void;

export type ComponentType =
    | "waypoints"
    | "segmentEdit"
    | "selectedRoute"
    | "airSpace"
    | "selectedRouteSequence"
    | "validator";

export type EventNamesType =
    | "AIRSPACE_SHOW"
    | "ALTITUDE_RANGE"
    | "SELECTED_AIRSPACE_OPTIONS"
    | "SEGMENT_EDIT_MODE"
    | "SELECTED_ROUTE"
    | "SELECTED_ROUTE_SEQUENCE_INDEX"
    | "WAYPOINT_CREATE"
    | "WAYPOINT_GET"
    | "WAYPOINT_UPDATE"
    | "WAYPOINT_DELETE"
    | "WAYPOINT_ATTRIBUTE_UPDATE";
export type PublishedEventType<T> = {
    moduleName: string;
    component: ComponentType;
    eventName: EventNamesType;
    args: T;
};
export type RegisteredEventType<T> = {
    moduleName: string;
    eventName: EventNamesType;
    handler: HandlerType<T>;
};

type SegmentType = "arc";

type ArcSegment = {
    id: number;
    latitude: number;
    longitude: number;
    radius: number;
    type: SegmentType;
    created?: string;
    isInverted?: boolean;
};
const WaypointTransition = {
    flyBy: "fly-by",
    flyOver: "fly-over",
} as const;

type WaypointTransitionType = typeof WaypointTransition[keyof typeof WaypointTransition];

export type WaypointTestType = {
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

type Option = {
    value: number;
    label: string | undefined;
    type?: string;
};

export type AirSpaceTestType = {
    airSpaceShow: boolean;
    airspacesAltitudeRange: [number, number];
    selectedAirspaceOptions: Option[];
};
