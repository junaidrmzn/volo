import { useQuery } from "@tanstack/react-query";
import type { UseGetAllParameterGroupsOptions } from "./useGetAllParameterGroups";
import { useGetAllParameterGroups } from "./useGetAllParameterGroups";

export const getAllParameterGroupsQueryKey = () => ["fti-parameter-groups"];

export type UseGetAllParameterGroupsQueryOptions = UseGetAllParameterGroupsOptions;

export const useGetAllParameterGroupsQuery = (options?: UseGetAllParameterGroupsQueryOptions) => {
    const { getAllParameterGroupsWithResponseEnvelope } = useGetAllParameterGroups(options);
    const { data, isLoading, ...rest } = useQuery({
        queryKey: getAllParameterGroupsQueryKey(),
        queryFn: getAllParameterGroupsWithResponseEnvelope,
    });

    return { parameterGroups: data?.data || [], isLoading, pagination: data?.pagination, ...rest };
};
