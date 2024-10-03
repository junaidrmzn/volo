import { useToken } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import {
    Route,
    Waypoint,
    WaypointUpdate,
    useGetCorridorClearanceDataQuery,
    useGetFullEnvelopeValidationQuery,
    useGetWaypoints,
} from "@voloiq/flight-planning-api/v1";
import {
    createWaypointsDataFromHashMap,
    deselectAllWaypoints,
    isWaypointPositionUpdated,
    returnVoloiqMap,
    updateArcSegmentsOnWaypointsHashMap,
    useMapContext,
    useMapEvent,
} from "@voloiq/map";
import { useAxiosService } from "@voloiq/service";
import { useGetRouteFullEnergy, useGetRouteTerrainData } from "../../api-hooks";
import type { INTERSECTION_TYPES } from "../../api-hooks/route/intersectRoutes";
import { useIntersectRoutes } from "../../api-hooks/route/intersectRoutes";
import { useCreateWayointWrapper, useEditWaypointWrapper } from "../../api-hooks/waypointHookWrappers";
import { useFlightStatusContext } from "../../contexts/flight-status";
import { useSelectedRouteSequenceIndex } from "../selected-route-sequence-index";
import { SnapDialog, useSnapDialog } from "./SnapDialog";
import { WaypointLayer } from "./WaypointLayer";
import { SegmentEditing, useSegmentEditingContext } from "./segment-editing";
import { useRouteCorridorLayer } from "./useRouteCorridorLayer";
import { useRouteLayer } from "./useRouteLayer";
import { useRouteObstaclesUpdate } from "./useRouteObstaclesUpdate";
import { useSetRouteEnergySettingsOnMap } from "./useSetRouteEnergySettingsOnMap";
import { useWaypointAdd } from "./useWaypointAdd";
import { useWaypointDrag } from "./useWaypointDrag";

/* eslint no-underscore-dangle: 0 */

type RouteLayerProps = {
    route: Route;
};

/**
 * Wraps the useRouteLayer Hook into a functional component and adds markers to the map
 * @param props
 * @returns
 */

export const RouteLayer: FCC<RouteLayerProps> = (props) => {
    const { route } = props;
    const { map } = useMapContext();
    const mapObject = returnVoloiqMap(map);
    const { selectedRouteSequenceIndex, setSelectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const { isLoading, createWaypointAsync } = useCreateWayointWrapper(route.id, mapObject);
    const { editWaypointOnRouteAsync } = useEditWaypointWrapper(route.id);
    const routeColor = useToken("colors", "darkBlue.500");
    const routeLayerId = `route-layer-${route.id}`;
    const { changeCoordinateAtIndexDragHandler, updateNewRouteCoordinates } = useRouteLayer({
        routeLayerId,
        route,
        routeColor,
        isLoading,
    });
    const { data: waypointsQueryData, isRefetching } = useGetWaypoints(route.id);
    const { clearFullEnergyCache } = useGetRouteFullEnergy(route.id);
    const { clearFullEnvelopeValidationCache } = useGetFullEnvelopeValidationQuery({ routeId: route.id });
    const { invalidateRouteTerrainData, isFetching } = useGetRouteTerrainData(route.id);
    const isWaypointAddable = useIsAuthorizedTo(["create"], ["Waypoint"]);
    const { setSegmentEditMode } = useSegmentEditingContext();
    const { setFlightStatus } = useFlightStatusContext();
    const obstaclesQueryData = useGetCorridorClearanceDataQuery(route.id);

    const invalidateRoute = () => {
        clearFullEnergyCache(setFlightStatus);
        invalidateRouteTerrainData();
        clearFullEnvelopeValidationCache();
    };
    useRouteObstaclesUpdate({ obstaclesData: obstaclesQueryData, isTerrainFetching: isFetching });
    useRouteCorridorLayer();
    useWaypointAdd({
        layerId: routeLayerId,
        createWaypointAsync,
        onSuccessfulAdd: () => {
            clearFullEnergyCache(setFlightStatus);
        },
        isWaypointAddable,
        isVoloiqMap: true,
    });

    const {
        nearestWaypointToSnapTo,
        snapTargetRoute,
        setNearestWaypointToSnapTo,
        setSnapTargetRoute,
        getWaypointToSnapTo,
    } = useWaypointDrag({
        routeId: route.id,
        waypointsOnRoute: waypointsQueryData || [],
        dragHandler: changeCoordinateAtIndexDragHandler,
        onDragEndCallback: () => {},
    });

    const { handleSnapDialogCancel } = useSnapDialog(setNearestWaypointToSnapTo, setSnapTargetRoute);

    // This needs to be an axios request instead of a useUpdateService request, otherwise we'll run into a dead lock when putting multiple callbacks to trigger the HTTP call in a Promise.all
    const { axiosPut } = useAxiosService();
    const updateArcSegment = async (waypoint: Waypoint) => {
        if (waypoint.routeSegment?.type === "arc") {
            await axiosPut({
                path: `/routes/${route.id}/waypoints/${waypoint.id}/segment`,
                data: {
                    segmentData: waypoint.routeSegment,
                    segmentType: "arc",
                },
            });
            updateArcSegmentsOnWaypointsHashMap(waypoint.routeSegment.id, mapObject, waypoint.routeSegment);
        }
    };

    const updateSelectedRouteSequenceIndex = (routeSequenceIndex: number | undefined) =>
        setSelectedRouteSequenceIndex(routeSequenceIndex);

    const updateRouteCoordinates = (props: {
        index?: number;
        lng?: number;
        lat?: number;
        waypointsArray?: Waypoint[];
    }) => {
        const { index, lng, lat, waypointsArray } = props;
        if (index && lng && lat) changeCoordinateAtIndexDragHandler(index, lng, lat);
        else if (waypointsArray) updateNewRouteCoordinates(waypointsArray);
    };

    useSetRouteEnergySettingsOnMap(mapObject, route.routeEnergySettings);
    const saveWaypointEdit = async (route: Route) => {
        if (route.waypoints && selectedRouteSequenceIndex) {
            const sourceWaypointId = route.waypoints.find(
                (wp) => wp.routeSequenceIndex === selectedRouteSequenceIndex
            )?.id;

            if (
                sourceWaypointId &&
                map &&
                mapObject.waypointsHashMap &&
                mapObject.waypointsHashMap[sourceWaypointId] &&
                mapObject.waypointEditSession
            ) {
                const waypoint = mapObject.waypointsHashMap[sourceWaypointId]?.properties;
                const waypointsList = createWaypointsDataFromHashMap(mapObject, true);
                if (mapObject.updateRouteCoordinates)
                    mapObject.updateRouteCoordinates({ waypointsArray: waypointsList });
                if (
                    waypoint &&
                    isWaypointPositionUpdated(
                        [
                            mapObject.waypointOriginalCoordinates?.lng ?? 0,
                            mapObject.waypointOriginalCoordinates?.lat ?? 0,
                        ],
                        [waypoint.lng, waypoint.lat]
                    )
                ) {
                    const waypointsWithPotentialArcSegmentChanges = waypointsList?.slice(
                        waypoint.routeSequenceIndex - 1,
                        waypoint.routeSequenceIndex + 1
                    );
                    const currentWaypointEditSessionDetails = mapObject.waypointEditSession[sourceWaypointId];

                    if (currentWaypointEditSessionDetails) currentWaypointEditSessionDetails.activeSessions += 1;
                    else if (mapObject.waypointEditSession)
                        mapObject.waypointEditSession[sourceWaypointId] = {
                            activeSessions: 1,
                            originalCoordinates: [
                                mapObject.waypointOriginalCoordinates?.lng ?? 0,
                                mapObject.waypointOriginalCoordinates?.lat ?? 0,
                            ],
                        };
                    await Promise.all(waypointsWithPotentialArcSegmentChanges?.map(updateArcSegment) ?? []);
                    await editWaypointOnRouteAsync(waypoint as WaypointUpdate);
                    if (mapObject.waypointEditSession && mapObject.waypointEditSession[sourceWaypointId]) {
                        const currentWaypointEditSessionDetails = mapObject.waypointEditSession[sourceWaypointId];
                        if (currentWaypointEditSessionDetails) currentWaypointEditSessionDetails.activeSessions -= 1;
                    }
                    if (!mapObject.waypointEditSession[sourceWaypointId]?.activeSessions) {
                        invalidateRoute();
                        mapObject.isWaypointUpdate = false;
                    }
                }

                mapObject.selectedRouteSequenceIndex = -1;
                mapObject.currentWaypointEditId = undefined;
            }
        }
    };

    const handleWaypointEdit = async (waypoint: Waypoint) => {
        if (!getWaypointToSnapTo(waypoint)) saveWaypointEdit(route);
    };

    /**
     * deselect wp when click on map
     */
    useMapEvent("click", () => {
        if (selectedRouteSequenceIndex === undefined) return;
        if (mapObject?._canvas.style.cursor === "") {
            mapObject.selectedRouteSequenceIndex = -1;
            setSelectedRouteSequenceIndex(undefined);
        }
        if (!mapObject?.selectedRouteSequenceIndex && mapObject?._canvas.style.cursor === "") {
            deselectAllWaypoints(mapObject);
            setSelectedRouteSequenceIndex(undefined);
            setSegmentEditMode("none");
        }
    });

    const { intersectRoutesAsync } = useIntersectRoutes(route.id, mapObject);

    // TODO: refactor - move intersection handling into its own hook
    const handleIntersection = async (type: INTERSECTION_TYPES) => {
        if (!(nearestWaypointToSnapTo && snapTargetRoute && route.waypoints)) return;
        const sourceWaypointId = route.waypoints.find((wp) => wp.routeSequenceIndex === selectedRouteSequenceIndex)?.id;
        if (!sourceWaypointId) return;
        try {
            await intersectRoutesAsync({
                event: {
                    sourceWaypointId,
                    targetRouteId: snapTargetRoute.id,
                    targetWaypointId: nearestWaypointToSnapTo.id,
                },
                type,
            });
            handleSnapDialogCancel();
            clearFullEnergyCache?.();
        } catch {
            handleSnapDialogCancel();
        }
    };

    return (
        <>
            {nearestWaypointToSnapTo && (
                <SnapDialog
                    isOpen
                    onCancel={() => {
                        handleSnapDialogCancel();
                        saveWaypointEdit(route);
                    }}
                    onBranchOff={() => handleIntersection("BRANCHOFF")}
                    onJoinOnwards={() => handleIntersection("JOINONWARDS")}
                    routeToJoin={snapTargetRoute}
                />
            )}
            {waypointsQueryData && !isRefetching && map?.loaded && (
                <WaypointLayer
                    map={mapObject}
                    waypoints={waypointsQueryData}
                    routeId={route.id}
                    updateSelectedRouteSequenceIndex={updateSelectedRouteSequenceIndex}
                    handleWaypointEdit={handleWaypointEdit}
                    updateRouteCoordinates={updateRouteCoordinates}
                    selectedRouteSequenceIndex={selectedRouteSequenceIndex}
                />
            )}
            <SegmentEditing />
        </>
    );
};
