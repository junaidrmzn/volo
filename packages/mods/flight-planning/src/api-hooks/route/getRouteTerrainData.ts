import { useQuery, useQueryClient } from "react-query";
import { useGetCorridorClearanceDataQuery, useGetTerrainData } from "@voloiq/flight-planning-api/v1";
import { useJobQueue } from "@voloiq/flight-planning-utils";
import { useService } from "@voloiq/service";

export const useGetRouteTerrainData = (routeId?: string | number) => {
    const { baseUrl } = useService();
    const queryClient = useQueryClient();
    const url = `${baseUrl}/routes/${routeId}/terrain`;
    const queryKey = ["route-terrain-computation", { routeId }];
    const { invalidateCorridorClearanceData } = useGetCorridorClearanceDataQuery(routeId);
    const { isSuccess, isFetching, invalidate } = useJobQueue({
        startJobUrl: url,
        jobKey: ["terrain", { routeId }],
        dependentQueryKey: queryKey,
    });

    const { refetchData, data } = useGetTerrainData(routeId);

    const query = useQuery({
        queryKey,
        enabled: isSuccess,
        queryFn: refetchData,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 20, // refetch after 20min or manually invalidation
    });
    if (!query.data) query.data = data;
    return {
        ...query,
        isFetching: isFetching || query.isFetching,
        invalidateRouteTerrainData: async () => {
            invalidate();
            await queryClient.invalidateQueries(queryKey);
            invalidateCorridorClearanceData();
        },
    };
};
