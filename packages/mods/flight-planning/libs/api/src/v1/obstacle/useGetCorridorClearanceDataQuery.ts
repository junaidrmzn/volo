import { useQuery, useQueryClient } from "react-query";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { ObstacleCorridorQuery } from "@voloiq/flight-planning-api/v1";
import { useJobQueue } from "@voloiq/flight-planning-utils";
import { useService } from "@voloiq/service";
import { useGetCorridorClearanceData } from "./useGetCorridorClearanceData";

export const useGetCorridorClearanceDataQuery = (routeId?: string | number): ObstacleCorridorQuery => {
    const { baseUrl } = useService();
    const queryClient = useQueryClient();
    const url = `${baseUrl}/routes/${routeId}/corridor-clearance`;
    const queryKey = ["corridor-clearance-computation", { routeId }];
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const vfp1311 = isFeatureFlagEnabled("vfp-1311");
    const { isSuccess, isFetching, invalidate } = useJobQueue({
        startJobUrl: url,
        jobKey: ["corridor-clearance", { routeId }],
        dependentQueryKey: queryKey,
    });
    const { refetchData, data } = useGetCorridorClearanceData(routeId);

    const query = useQuery({
        queryKey,
        enabled: isSuccess,
        queryFn: refetchData,
    });
    if (!vfp1311) query.data = { corridorObstacles: [], graphObstacles: [] };
    if (!query.data) query.data = data;
    return {
        query,
        isFetching: isFetching || query.isFetching,
        invalidateCorridorClearanceData: () => {
            invalidate();
            queryClient.invalidateQueries(queryKey);
        },
    };
};
