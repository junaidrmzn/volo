import { useDeleteService } from "@voloiq/service";

type UseRemoveArcSegmentOptions = {
    routeId: number;
    waypointId: number;
};

export const useRemoveArcSegment = (options: UseRemoveArcSegmentOptions) => {
    const { routeId, waypointId } = options;

    const { sendRequest: removeArcSegment, state } = useDeleteService({
        route: `/routes/${routeId}/waypoints/${waypointId}/segment`,
    });

    return { removeArcSegment, isLoading: state === "pending" };
};
