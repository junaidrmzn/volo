import { useQuery } from "@tanstack/react-query";
import { useOverviewFilter } from "../useOverviewFilter";

export const useGetAllParameterSourcesQuery = () => {
    const { getAllParameterSources } = useOverviewFilter();

    const queryKey = ["parameterSources"];
    const parameterSourcesQuery = useQuery({
        queryKey,
        queryFn: getAllParameterSources,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        parameterSources: parameterSourcesQuery.data || [],
        isparameterSourcesLoading: parameterSourcesQuery.isLoading,
    };
};
