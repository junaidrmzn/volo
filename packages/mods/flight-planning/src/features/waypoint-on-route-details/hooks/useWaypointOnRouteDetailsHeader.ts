import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { VoloiqMap, VoloiqMapStoreType, createWaypointsDataFromHashMap } from "@voloiq/map";
import { useDeleteWaypointWrapper } from "../../../api-hooks/waypointHookWrappers";
import { updateWaypointsAfterDelete } from "../../../utils/waypoints";
import { useSegmentEditingContext } from "../../map-route-layer/segment-editing";
import { useSelectedRouteSequenceIndex } from "../../selected-route-sequence-index";

type UseWaypointOnRouteDetailsHeaderOptions = {
    routeId: number;
    voloiqMapStore?: VoloiqMapStoreType;
    onSuccessfulDelete?: () => unknown;
};

export const useWaypointOnRouteDetailsHeader = (options: UseWaypointOnRouteDetailsHeaderOptions) => {
    const { routeId, onSuccessfulDelete, voloiqMapStore } = options;
    const { deleteWaypointOnRoute } = useDeleteWaypointWrapper(
        routeId,
        voloiqMapStore?.map as VoloiqMap,
        onSuccessfulDelete
    );
    const { setSelectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const { setSegmentEditMode } = useSegmentEditingContext();
    const waypointsList = createWaypointsDataFromHashMap(voloiqMapStore?.map, true);
    const handleDeleteWaypoint = (waypoint: Waypoint) => {
        if (!waypoint.routeSequenceIndex) return;
        if (!waypoint?.id) return;
        if (waypointsList)
            updateWaypointsAfterDelete(waypointsList, waypoint.routeSequenceIndex, voloiqMapStore?.map as VoloiqMap);
        deleteWaypointOnRoute(waypoint.id);
        setSelectedRouteSequenceIndex(undefined);
    };

    const deselectWaypoint = () => {
        setSelectedRouteSequenceIndex(undefined);
        setSegmentEditMode("none");
    };

    return {
        handleDeleteWaypoint,
        deselectWaypoint,
    };
};
