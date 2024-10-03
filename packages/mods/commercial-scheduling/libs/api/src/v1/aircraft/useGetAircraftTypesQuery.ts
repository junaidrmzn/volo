import { useQuery } from "@tanstack/react-query";
import { useGetAircraftTypes } from "./useGetAircraftTypes";

export const useGetAircraftTypesQuery = () => {
    const { sendRequest } = useGetAircraftTypes({ manual: true });

    const queryKey = ["aircraftTypes"];
    const queryFunction = () => {
        return sendRequest({
            params: {
                page: 1,
                size: 100,
                vt912: "true",
            },
        });
    };

    const aircraftTypesQuery = useQuery({
        queryKey,
        queryFn: queryFunction,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { aircraftTypes: aircraftTypesQuery.data || [], isLoading: aircraftTypesQuery.isLoading };
};
