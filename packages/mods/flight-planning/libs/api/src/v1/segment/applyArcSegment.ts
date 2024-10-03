import { useCreateService } from "@voloiq/service";
import { SegmentInsert } from "./models";

type UseApplyArcSegmentOptions = {
    routeId: number;
    waypointId: number;
};

export const useApplyArcSegment = (options: UseApplyArcSegmentOptions) => {
    const { routeId, waypointId } = options;

    const { sendRequest: applyArcSegment, state } = useCreateService<SegmentInsert, {}>({
        route: `/routes/${routeId}/waypoints/${waypointId}/segment`,
    });

    return { applyArcSegment, isLoading: state === "pending" };
};
