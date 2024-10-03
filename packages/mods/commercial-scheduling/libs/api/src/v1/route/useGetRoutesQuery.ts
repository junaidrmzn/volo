import { useQuery } from "@tanstack/react-query";
import { ROUTE_OPTION_BASE_URL } from "../../serviceEndpoints";
import { useGetRoutes } from "./useGetRoutes";

type UseGetRoutesQueryOptions = {
    routeOptionId?: string;
};

export const useGetRoutesQuery = (options: UseGetRoutesQueryOptions) => {
    const { routeOptionId } = options;
    const { sendRequest } = useGetRoutes({ manual: true });

    const queryKey = ["routes", routeOptionId];
    const queryFunction = () => {
        return sendRequest({
            baseURL: `${ROUTE_OPTION_BASE_URL}/${routeOptionId}/routes`,
            params: {
                offset: 0,
                limit: 100,
                routeOptionId,
                withWaypoints: "false",
            },
        });
    };

    const routesQuery = useQuery({
        queryKey,
        queryFn: queryFunction,
        enabled: !!routeOptionId,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { routes: routesQuery.data || [], isLoading: routesQuery.isLoading };
};
