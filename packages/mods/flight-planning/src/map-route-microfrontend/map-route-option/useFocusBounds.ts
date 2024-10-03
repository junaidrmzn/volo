import { LngLatBounds } from "maplibre-gl";
import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";

export const useFocusBounds = (routeOptionId: number) => {
    const {
        data: routeOption,
        isLoading,
        isError,
    } = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });

    if (routeOption) {
        return {
            focusBounds: new LngLatBounds(
                [routeOption.arrivalExternalVertiport.lng, routeOption.arrivalExternalVertiport.lat],
                [routeOption.departureExternalVertiport.lng, routeOption.departureExternalVertiport.lat]
            ),
            isLoadingRouteOption: isLoading,
            isErrorRouteOption: isError,
            routeOption,
        };
    }
    return {
        focusBounds: new LngLatBounds([0, 0, 0, 0]),
        isLoadingRouteOption: isLoading,
        isErrorRouteOption: isError,
        routeOption: undefined,
    };
};
