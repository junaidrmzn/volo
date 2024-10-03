import { useQuery } from "@tanstack/react-query";
import { useOverviewFilter } from "../useOverviewFilter";

export const useGetAllSensorTypesQuery = () => {
    const { getAllSensorTypes } = useOverviewFilter();

    const queryKey = ["sensorTypes"];
    const sensorTypesQuery = useQuery({
        queryKey,
        queryFn: getAllSensorTypes,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        sensorTypes: sensorTypesQuery.data || [],
        isSensorTypesLoading: sensorTypesQuery.isLoading,
    };
};
