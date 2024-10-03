export const getWaypointName = (item: Waypoint) => {
    if (item.isVertiport) {
        return item.name;
    }
    return `WP${item.routeSequenceIndex}`;
};
