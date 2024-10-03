import { useQuery } from "@tanstack/react-query";
import { useGetAircraftTypes } from "./useGetAircraftTypes";

export const useGetAircraftTypesQuery = () => {
    const { sendRequest } = useGetAircraftTypes({ manual: true });

    const queryKey = ["aircraft-types"];
    const aircraftTypesQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { aircraftTypes: aircraftTypesQuery.data || [], isLoading: aircraftTypesQuery.isLoading };
};
