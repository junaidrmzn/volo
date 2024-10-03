import { RequirePermissions } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetFullEnvelopeValidationQuery, useGetWaypoints } from "@voloiq/flight-planning-api/v1";
import type { Route } from "@voloiq/flight-planning-api/v1";
import { VoloiqMapStoreType, createWaypointsDataFromHashMap } from "@voloiq/map";
import { useGetRouteFullEnergy, useGetRouteTerrainData } from "../../../api-hooks";
import { ErrorPage, LoadingSpinner } from "../../../components";
import { useSelectedRouteSequenceIndex } from "../../selected-route-sequence-index";
import { WaypointOnRouteDetails } from "../../waypoint-on-route-details";
import { WaypointOnRouteList } from "../../waypoint-on-route-list";
import { RouteDetailsHeader } from "./RouteDetailsHeader";
import { SubmitFlightPlanButton } from "./SubmitFlightPlanButton";

type RouteDetailsProps = {
    route: Route;
    voloiqMapStore?: VoloiqMapStoreType;
};
export const RouteDetails = (props: RouteDetailsProps) => {
    const { route, voloiqMapStore } = props;
    const { selectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const waypointsQuery = useGetWaypoints(route.id);
    const { clearFullEnergyCache } = useGetRouteFullEnergy(route.id);
    const { clearFullEnvelopeValidationCache } = useGetFullEnvelopeValidationQuery({ routeId: route.id });
    const { invalidateRouteTerrainData } = useGetRouteTerrainData(route.id);
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const waypointsData = createWaypointsDataFromHashMap(voloiqMapStore?.map, true);

    if (waypointsQuery.isLoading) return <LoadingSpinner />;

    if (waypointsQuery.isError) return <ErrorPage error={waypointsQuery.error.message} />;
    const waypoints = waypointsData ?? waypointsQuery.data;
    const selectedWaypoint = waypoints?.find((waypoint) => waypoint.routeSequenceIndex === selectedRouteSequenceIndex);

    const invalidateRoute = () => {
        clearFullEnergyCache();
        invalidateRouteTerrainData();
        clearFullEnvelopeValidationCache();
    };

    return (
        <>
            {selectedRouteSequenceIndex !== undefined && selectedWaypoint ? (
                <WaypointOnRouteDetails
                    isLastWaypoint={selectedRouteSequenceIndex === (waypoints && waypoints.length - 1)}
                    isEditable={selectedRouteSequenceIndex !== (0 && waypoints && waypoints.length - 1)}
                    routeId={route.id}
                    waypoint={selectedWaypoint}
                    onWaypointEditCallback={invalidateRoute}
                    onSuccessfulDelete={invalidateRoute}
                    voloiqMapStore={voloiqMapStore}
                />
            ) : (
                <>
                    <RouteDetailsHeader route={route} />
                    <WaypointOnRouteList
                        onWaypointDragCallback={invalidateRoute}
                        routeId={route.id}
                        waypoints={waypoints ?? []}
                        voloiqMapStore={voloiqMapStore}
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
