import { Dispatch, SetStateAction } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FlightStatus, useGetFullEnergy } from "@voloiq/flight-planning-api/v1";
import { useJobQueue } from "@voloiq/flight-planning-utils";
import { useService } from "@voloiq/service";
import { useSelectedRoute } from "../../features/selected-route";

export const useGetRouteFullEnergy = (
    routeId?: string | number,
    enabled: boolean = false,
    setFlightStatus?: Dispatch<SetStateAction<Partial<FlightStatus>>>
) => {
    const { baseUrl } = useService();
    const queryClient = useQueryClient();
    const url = `${baseUrl}/routes/${routeId}/energy`;
    const queryKey = ["routes", { routeId }, "energy", "fullEnergy"];
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { routeOptionId } = useSelectedRoute();

    const { isSuccess, isFetching, invalidate } = useJobQueue({
        startJobUrl: url,
        jobKey: ["routes", { routeId }, "full-energy-calculation"],
        dependentQueryKey: queryKey,
        enabled,
    });

    const { refetchData } = useGetFullEnergy({ routeId: routeId ?? 0 });

    const query = useQuery({
        queryKey,
        enabled: !isFetching && isSuccess && enabled,
        queryFn: refetchData,
        onSuccess: async (data) => {
            if (!data) return;
            await queryClient.invalidateQueries(["routes", { routeId }, "waypoints"]);
            await queryClient.invalidateQueries(["route-options", { routeOptionId }]);
            setFlightStatus?.({
                remainingEnergy: data.remainingEnergy,
                duration: data.duration,
                ...(!isFeatureFlagEnabled("vfp-835") && {
                    alerts: data.alerts,
                    validationStatus: data.validationStatus,
                }),
            });
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 20, // refetch after 20min or manually invalidation
    });

    return {
        ...query,
        isFetching: isFetching || query.isFetching,
        invalidateFullEnergyCache: (setFlightStatus?: Dispatch<SetStateAction<Partial<FlightStatus>>>) => {
            setFlightStatus?.({
                validationStatus: "not_yet_validated",
            });
            invalidate();
            queryClient.invalidateQueries(queryKey);
            queryClient.invalidateQueries(["route-options", { routeOptionId }]);
        },
        clearFullEnergyCache: (setFlightStatus?: Dispatch<SetStateAction<Partial<FlightStatus>>>) => {
            setFlightStatus?.({
                validationStatus: "not_yet_validated",
            });
            invalidate();
            queryClient.removeQueries(["routes", { routeId }, "energy"]);
            queryClient.invalidateQueries(["route-options", { routeOptionId }]);
        },
    };
};
