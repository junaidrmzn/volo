export const getWaypointsCount = (items: Waypoint[] | undefined): number => {
    if (!items || items.length <= 2) {
        return 0;
    }
    return items.length - 2 ?? 0;
};
