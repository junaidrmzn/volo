import { Waypoint } from "@voloiq/flight-planning-api/v1";

export const getWaypointName = (item: Waypoint) => {
    if (item.isVertiport) {
        const words = item.name.split(" ");
        if (words && words.length > 1 && words[1]) {
            return `${words[0]} ${words[1].charAt(0).toUpperCase()}`;
        }
        return item.name;
    }

    return `WP${item.routeSequenceIndex}`;
};
