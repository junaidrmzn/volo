import { RequirePermissions } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetFullEnvelopeValidationQuery, useGetWaypoints } from "@voloiq/flight-planning-api/v1";
import type { Route } from "@voloiq/flight-planning-api/v1";
import { useGetRouteFullEnergy, useGetRouteTerrainData } from "../../../api-hooks";
import { ErrorPage, LoadingSpinner } from "../../../components";
import { useSelectedRouteSequenceIndex } from "../../selected-route-sequence-index";
import { WaypointOnRouteDetails } from "../../waypoint-on-route-details";
import { WaypointOnRouteList } from "../../waypoint-on-route-list";
import { RouteDetailsHeader } from "./RouteDetailsHeader";
import { SubmitFlightPlanButton } from "./SubmitFlightPlanButton";

type RouteDetailsProps = {
    route: Route;
};
export const RouteDetailsOld = (props: RouteDetailsProps) => {
    const { route } = props;
    const { selectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const waypointsQuery = useGetWaypoints(route.id);
    const { clearFullEnergyCache } = useGetRouteFullEnergy(route.id);
    const { clearFullEnvelopeValidationCache } = useGetFullEnvelopeValidationQuery({ routeId: route.id });
    const { invalidateRouteTerrainData } = useGetRouteTerrainData(route.id);
    const { isFeatureFlagEnabled } = useFeatureFlags();

    if (waypointsQuery.isLoading) return <LoadingSpinner />;

    if (waypointsQuery.isError) return <ErrorPage error={waypointsQuery.error.message} />;

    const selectedWaypoint = waypointsQuery.data?.find(
        (waypoint) => waypoint.routeSequenceIndex === selectedRouteSequenceIndex
    );

    const invalidateRoute = () => {
        clearFullEnergyCache();
        invalidateRouteTerrainData();
        clearFullEnvelopeValidationCache();
    };

    return (
        <>
            {selectedRouteSequenceIndex !== undefined && selectedWaypoint ? (
                <WaypointOnRouteDetails
                    isLastWaypoint={
                        selectedRouteSequenceIndex === (waypointsQuery.data && waypointsQuery.data.length - 1)
                    }
                    isEditable={
                        selectedRouteSequenceIndex !== (0 && waypointsQuery.data && waypointsQuery.data.length - 1)
                    }
                    routeId={route.id}
                    waypoint={selectedWaypoint}
                    onWaypointEditCallback={invalidateRoute}
                    onSuccessfulDelete={invalidateRoute}
                />
            ) : (
                <>
                    <RouteDetailsHeader route={route} />
                    <WaypointOnRouteList
                        onWaypointDragCallback={invalidateRoute}
                        routeId={route.id}
                        waypoints={waypointsQuery.data ?? []}
                    />
                    {isFeatureFlagEnabled("vfp-699") && (
                        <RequirePermissions resources={["FlightPlan"]} actions={["create", "read", "update", "delete"]}>
                            <SubmitFlightPlanButton route={route} />
                        </RequirePermissions>
                    )}
                </>
            )}
        </>
    );
};
