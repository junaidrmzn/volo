import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useDeleteWaypointWrapper } from "../../../api-hooks/waypointHookWrappers";
import { useSegmentEditingContext } from "../../map-route-layer/segment-editing";
import { useSelectedRouteSequenceIndex } from "../../selected-route-sequence-index";

type UseWaypointOnRouteDetailsHeaderOptions = {
    routeId: number;
    onSuccessfulDelete?: () => unknown;
};

export const useWaypointOnRouteDetailsHeaderOld = (options: UseWaypointOnRouteDetailsHeaderOptions) => {
    const { routeId, onSuccessfulDelete } = options;
    const { deleteWaypointOnRoute } = useDeleteWaypointWrapper(routeId, undefined, onSuccessfulDelete);
    const { setSelectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const { setSegmentEditMode } = useSegmentEditingContext();
    const handleDeleteWaypoint = (waypoint: Waypoint) => {
        if (!waypoint.routeSequenceIndex) return;
        if (!waypoint?.id) return;
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
