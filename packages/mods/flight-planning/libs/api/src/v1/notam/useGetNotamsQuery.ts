import { useQuery } from "react-query";
import { useJobQueue } from "@voloiq/flight-planning-utils";
import { useService } from "@voloiq/service";
import { Notam } from "./models";
import { useGetNotams } from "./useGetNotams";

type UseGetNotamsQueryOptions = {
    routeOptionId?: number | string;
    latitude: number;
    longitude: number;
    isEnabled?: boolean;
};
export const useGetNotamsQuery = (options: UseGetNotamsQueryOptions) => {
    const { routeOptionId, latitude, longitude, isEnabled = false } = options;
    const { baseUrl } = useService();

    const queryKey = ["route-options", { routeOptionId, latitude, longitude }, "notams"];

    const { isFetching, isSuccess } = useJobQueue({
        startJobUrl: `${baseUrl}/route-options/${routeOptionId}/notams-job?latitude=${latitude}&longitude=${longitude}`,
        jobKey: queryKey,
        dependentQueryKey: queryKey,
        enabled: isEnabled,
    });
    const { refetchData, data } = useGetNotams({
        routeOptionId: routeOptionId || 0,
        latitude,
        longitude,
        manual: true,
    });

    const query = useQuery<Notam | undefined, Error>({
        queryKey,
        enabled: isSuccess && isEnabled,
        queryFn: refetchData,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    if (!query.data) query.data = data;

    return {
        query,
        isFetching: isFetching || query.isFetching,
        isError: query.isError,
        isIdle: query.isIdle,
        isLoading: query.isLoading,
        error: query.error,
    };
};
