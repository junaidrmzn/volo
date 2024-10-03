import { useUpdateService } from "@voloiq/service";
import { SegmentInsert } from "./models";

type UseModifyArcSegmentOptions = {
    routeId: number;
    waypointId: number;
};

export const useModifyArcSegment = (options: UseModifyArcSegmentOptions) => {
    const { routeId, waypointId } = options;

    const { sendRequest: modifyArcSegment, state } = useUpdateService<SegmentInsert, {}>({
        route: `/routes/${routeId}/waypoints/${waypointId}/segment`,
    });

    return { modifyArcSegment, isLoading: state === "pending" };
};
