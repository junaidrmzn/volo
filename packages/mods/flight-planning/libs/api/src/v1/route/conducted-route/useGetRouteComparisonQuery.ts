import { useQuery } from "react-query";
import { useJobQueue } from "@voloiq/flight-planning-utils";
import type { AxiosError } from "@voloiq/service";
import { useService } from "@voloiq/service";
import type { RouteComparison } from "./models";
import { useGetRouteComparison } from "./useGetRouteComparison";

type UseGetRouteComparisonQueryOptions = {
    routeId: number | string;
    isEnabled?: boolean;
    onError?: (error: AxiosError<Error>) => void;
};
export const useGetRouteComparisonQuery = (options: UseGetRouteComparisonQueryOptions) => {
    const { routeId, isEnabled, onError } = options;
    const { baseUrl } = useService();

    const queryKey = ["routes", { routeId }, "route-comparison"];
    const jobKey = ["routes", { routeId }, "route-comparison-calculation-job"];
    const url = `${baseUrl}/routes/${routeId}/conducted-route`;

    const { isSuccess, isFetching, invalidate } = useJobQueue({
        startJobUrl: url,
        jobKey,
        dependentQueryKey: queryKey,
        enabled: isEnabled,
    });

    const { refetchData } = useGetRouteComparison({ routeId, manual: true });

    const query = useQuery<RouteComparison | undefined, AxiosError<Error>>({
        queryKey,
        enabled: isEnabled && isSuccess,
        queryFn: refetchData,
        onError,
    });

    return {
        ...query,
        isFetching: isFetching || query.isFetching,
        invalidate,
    };
};
