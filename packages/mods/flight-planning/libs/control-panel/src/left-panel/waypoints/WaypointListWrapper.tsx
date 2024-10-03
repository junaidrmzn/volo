import { ListItem } from "@volocopter/design-library-react";
import { Fragment } from "react";
import { getDistanceInNauticalMiles } from "@voloiq/flight-planning-utils";
import { WaypointListItem } from "./WaypointListItem";
import { WaypointListSegmentItem } from "./WaypointListSegmentItem";

type WaypointListProps = {
    waypoints?: Waypoint[];
};

export const WaypointListWrapper = (props: WaypointListProps) => {
    const { waypoints } = props;
    let distanceTillYet = 0;

    return (
        <>
            {waypoints &&
                waypoints.map((item, index) => {
                    const nextWaypoint = waypoints[index + 1];
                    const previousWaypoint = waypoints[index - 1];
                    const distanceFromPreviousWaypoint = Number.parseFloat(
                        getDistanceInNauticalMiles(item, previousWaypoint).toPrecision(3)
                    );
                    distanceTillYet += distanceFromPreviousWaypoint;

                    return (
                        <Fragment key={item.id}>
                            {/* Todo bring back draggability if needed */}
                            <ListItem>
                                <WaypointListItem item={item} distanceTillYet={distanceTillYet} />
                            </ListItem>
                            {nextWaypoint && <WaypointListSegmentItem waypoint={item} nextWaypoint={nextWaypoint} />}
                        </Fragment>
                    );
                })}
        </>
    );
};
