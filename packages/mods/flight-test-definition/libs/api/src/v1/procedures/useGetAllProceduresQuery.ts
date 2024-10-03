import { useQuery } from "@tanstack/react-query";
import type { UseGetAllProceduresOptions } from "./useGetAllProcedures";
import { useGetAllProcedures } from "./useGetAllProcedures";

export const getAllProceduresQueryKey = (definitionId: string) => ["procedure", definitionId];

export type UseGetAllProceduresQueryOptions = UseGetAllProceduresOptions;

export const useGetAllProceduresQuery = (options: UseGetAllProceduresOptions) => {
    const { definitionId } = options;
    const { getAllProceduresWithResponseEnvelope } = useGetAllProcedures({ ...options });

    const {
        data,
        refetch: getAllProcedures,
        isLoading,
    } = useQuery({
        enabled: !!definitionId,
        queryKey: getAllProceduresQueryKey(definitionId),
        queryFn: getAllProceduresWithResponseEnvelope,
    });

    return { procedures: data?.data, getAllProcedures, isLoading, pagination: data?.pagination };
};
