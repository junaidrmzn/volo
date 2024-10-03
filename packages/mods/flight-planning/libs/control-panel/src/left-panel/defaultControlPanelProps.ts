const anyWaypoint = (overwrites: Partial<Waypoint> = {}): Waypoint => ({
    id: 0,
    name: "Waypoint",
    routeSequenceIndex: 0,
    isVertiport: false,
    targetTimeOver: 0,
    altAboveRefAlt: 0,
    alt: 0,
    lat: 0,
    lng: 0,
    transitionType: "fly-by" as const,
    speed: 0,
    heading: 0,
    rnp: 0,
    transitionRadius: 0,
    ...overwrites,
});

export const waypoints: Waypoint[] = [
    anyWaypoint({ id: 1, lat: 49.0097, lng: 2.5479, alt: 0 }),
    anyWaypoint({ id: 2, lat: 48.8448, lng: 2.3734, alt: 0 }),
    anyWaypoint({ id: 3, lat: 48.8413, lng: 2.3696, alt: 0 }),
    anyWaypoint({ id: 4, lat: 48.8407, lng: 2.3693, alt: 0 }),
    anyWaypoint({ id: 5, lat: 48.8402, lng: 2.3691, alt: 0 }),
];

export const routeOption: RouteOption = {
    name: "Paris CDG - Austerlitz",
    aircraftType: "VoloCity",
};

export const routes: Route[] = [
    {
        id: 1,
        name: "North Route",
        distance: 8.3,
        duration: 183,
        validationStatus: "valid",
    },
    {
        id: 2,
        name: "South Route",
        distance: 9.2,
        duration: 198,
        validationStatus: "valid",
    },
];
