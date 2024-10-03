import { useEffect } from "react";
import { useGetRouteOption } from "../../api-hooks/useNetworkSchedulingService";

export const useConditionalRouteOption = (routeOptionId: number | undefined) => {
    const { data: routeOption, refetchData } = useGetRouteOption(`${routeOptionId}` ?? "-1");

    useEffect(() => {
        if (routeOptionId) {
            refetchData();
        }
    }, [refetchData, routeOptionId]);

    return { routeOption };
};
