import { useQuery } from "@tanstack/react-query";
import { GetPaginatedQueryKeyParamsType } from "../../common";
import type { UseGetAllWindchillRequirementsOptions } from "./useGetAllWindchillRequirements";
import { useGetAllWindchillRequirements } from "./useGetAllWindchillRequirements";

export const getAllWindchillRequirementsQueryKey = (params: GetPaginatedQueryKeyParamsType = {}) => [
    "windchill-requirements",
    params,
];

export type UseGetAllWindchillRequirementsQueryOptions = UseGetAllWindchillRequirementsOptions;

export const useGetAllWindchillRequirementsQuery = (options: UseGetAllWindchillRequirementsQueryOptions) => {
    const { params } = options;
    const { getAllWindchillRequirementsWithResponseEnvelope } = useGetAllWindchillRequirements();
    const formattedParams = {
        size: params?.size,
        ...(params?.filter?.length && params.filter?.length > 0 ? { filter: params?.filter } : undefined),
    };

    const { data, ...rest } = useQuery(
        getAllWindchillRequirementsQueryKey(formattedParams),
        () => getAllWindchillRequirementsWithResponseEnvelope({ params: formattedParams }),
        {
            staleTime: 100_000,
        }
    );

    return {
        windchillRequirements: data?.data || [],
        pagination: data?.pagination,
        ...rest,
    };
};
