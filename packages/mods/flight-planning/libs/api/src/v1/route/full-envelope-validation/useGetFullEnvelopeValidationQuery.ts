import { Dispatch, SetStateAction } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useMasterJobQueue } from "@voloiq/flight-planning-utils";
import { useService } from "@voloiq/service";
import { FlightStatus } from "../models";
import { useGetFullEnvelopeValidation } from "./useGetFullEnvelopeValidation";

type UseGetFullEnvelopeValidationQueryOptions = {
    routeId?: string | number;
    enabled?: boolean;
    setFlightStatus?: Dispatch<SetStateAction<Partial<FlightStatus>>>;
};
export const useGetFullEnvelopeValidationQuery = (options: UseGetFullEnvelopeValidationQueryOptions) => {
    const { routeId, enabled = false, setFlightStatus } = options;
    const { baseUrl } = useService();
    const queryClient = useQueryClient();
    const queryKey = ["routes", { routeId }, "full-envelope-validation"];

    const { isFetching, isSuccess, invalidate, removeQueries } = useMasterJobQueue({
        startJobUrl: `${baseUrl}/routes/${routeId}/full-envelope-validation`,
        jobKey: ["full-envelope-validation", "routes", { routeId }],
        dependentQueryKey: queryKey,
        enabled,
        retryIntervalOverride: 2000,
    });

    const { refetchData } = useGetFullEnvelopeValidation({ routeId: routeId ?? 0, manual: true });

    const query = useQuery({
        queryKey,
        enabled: isSuccess && enabled,
        queryFn: refetchData,
        onSuccess: async (data) => {
            if (!data) return;

            setFlightStatus?.({
                alerts: data.alerts,
                validationStatus: data.validationStatus,
            });
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 20, // refetch after 20 min or manually invalidate
    });

    return {
        ...query,
        isFetching: isFetching || query.isFetching,
        isSuccess: isSuccess || query.isSuccess,
        invalidateFullEnvelopeValidation: invalidate,
        clearFullEnvelopeValidationCache: () => {
            removeQueries();
            queryClient.removeQueries(queryKey);
        },
    };
};
