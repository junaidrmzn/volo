import { useQuery } from "@tanstack/react-query";
import type { UseGetAllDefinitionsOptions } from "./useGetAllDefinitions";
import { useGetAllDefinitions } from "./useGetAllDefinitions";

export const getAllDefinitionsQueryKey = (serviceOptions: UseGetAllDefinitionsOptions["serviceOptions"]) => [
    "definition",
    serviceOptions,
];

export const useGetAllDefinitionsQuery = (options: UseGetAllDefinitionsOptions) => {
    const { serviceOptions } = options;
    const { sendRequestWithResponseEnvelope } = useGetAllDefinitions({ serviceOptions });

    const {
        data,
        refetch: getAllFlightTestDefinitions,
        isLoading,
    } = useQuery({
        queryKey: getAllDefinitionsQueryKey(serviceOptions),
        queryFn: sendRequestWithResponseEnvelope,
    });

    return {
        flightTestDefinitions: data?.data,
        getAllFlightTestDefinitions,
        isLoading,
        pagination: data?.pagination,
    };
};
