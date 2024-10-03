import { useQuery } from "react-query";
import { useGetRouteOption } from "./useGetRouteOption";

type useGetRouteOptionQueryOptions = {
    routeOptionId: number;
    isEnabled: boolean;
};

export const useGetRouteOptionQuery = (options: useGetRouteOptionQueryOptions) => {
    const { routeOptionId, isEnabled } = options;

    const { refetchData } = useGetRouteOption({ routeOptionId, manual: true });

    return useQuery<Awaited<ReturnType<typeof refetchData>>, Error>({
        enabled: isEnabled,
        queryKey: ["route-options", { routeOptionId }],
        queryFn: refetchData,
        staleTime: 60_000,
    });
};
