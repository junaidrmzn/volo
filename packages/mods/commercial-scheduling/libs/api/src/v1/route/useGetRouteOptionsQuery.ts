import { useQuery } from "@tanstack/react-query";
import { useGetRouteOptions } from "./useGetRouteOptions";

type UseGetRouteOptionsQueryOptions = {
    aircraftTypeId?: string;
    arrivalVertiportId?: string;
    departureVertiportId?: string;
};

export const useGetRouteOptionsQuery = (options: UseGetRouteOptionsQueryOptions) => {
    const { aircraftTypeId, arrivalVertiportId, departureVertiportId } = options;
    const { sendRequest } = useGetRouteOptions({ manual: true });

    const queryKey = ["routeOptions", aircraftTypeId, departureVertiportId, arrivalVertiportId];
    const queryFunction = () => {
        return sendRequest({
            params: {
                offset: 0,
                limit: 100,
                orderBy: "name:ASC",
                isValid: true,
                aircraftTypeId,
                departureVertiportId,
                arrivalVertiportId,
            },
        });
    };

    const routeOptionsQuery = useQuery({
        queryKey,
        queryFn: queryFunction,
        enabled: !!aircraftTypeId && !!departureVertiportId && !!arrivalVertiportId,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { routeOptions: routeOptionsQuery.data || [], isLoading: routeOptionsQuery.isLoading };
};
