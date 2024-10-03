import { Fragment } from "react";
import { Route, Waypoint } from "@voloiq/flight-planning-api/v1";
import { getDistanceInNauticalMiles } from "../../../../libs/utils";
import { UnifiedWaypointItem } from "./UnifiedWaypointItem";
import { useWaypointList } from "./hooks/useWaypointList";

export type WaypointListWrapperProps = {
    waypoints?: Waypoint[];
    selectedRoute: Route;
};

export const WaypointListWrapper = (props: WaypointListWrapperProps) => {
    const { waypoints, selectedRoute } = props;
    const { invalidateRoute } = useWaypointList(selectedRoute);
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
                            <UnifiedWaypointItem
                                item={item}
                                distanceTillYet={distanceTillYet}
                                selectedRouteId={selectedRoute.id}
                                onInvalidateRoute={invalidateRoute}
                            />
                            {nextWaypoint && (
                                <UnifiedWaypointItem
                                    item={item}
                                    nextItem={nextWaypoint}
                                    distanceToNext={Number.parseFloat(
                                        getDistanceInNauticalMiles(item, nextWaypoint).toPrecision(3)
                                    )}
                                    selectedRouteId={selectedRoute.id}
                                    onInvalidateRoute={invalidateRoute}
                                />
                            )}
                        </Fragment>
                    );
                })}
        </>
    );
};
