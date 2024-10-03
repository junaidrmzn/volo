import { useQuery } from "@tanstack/react-query";
import { UseGetAllProcedureRevisionsOptions, useGetAllProcedureRevisions } from "./useGetAllProcedureRevisions";

export type UseGetAllProcedureRevisionsQueryOptions = UseGetAllProcedureRevisionsOptions;

export const getAllProceduresRevisionsQueryKey = (definitionId: string, procedureId: string) => [
    "procedureRevision",
    [definitionId, procedureId],
];

export const useGetAllProcedureRevisionsQuery = (options: UseGetAllProcedureRevisionsQueryOptions) => {
    const { definitionId, procedureId } = options;
    const { sendRequest } = useGetAllProcedureRevisions({ ...options });

    const {
        data: procedureRevisions,
        refetch: getProcedureRevisions,
        isLoading,
    } = useQuery({
        queryKey: getAllProceduresRevisionsQueryKey(definitionId, procedureId),
        queryFn: sendRequest,
    });

    return { procedureRevisions, getProcedureRevisions, isLoading };
};
