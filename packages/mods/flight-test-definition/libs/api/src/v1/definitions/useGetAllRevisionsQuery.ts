import { useQuery } from "@tanstack/react-query";
import { UseGetAllRevisions, useGetAllRevisions } from "./useGetAllRevisions";

export const getRevisionsQueryKey = (definitionId: string) => ["revision", definitionId];

export const useGetAllRevisionsQuery = (options: UseGetAllRevisions) => {
    const { definitionId } = options;
    const { sendRequest: getRevisions } = useGetAllRevisions({ ...options, manual: true });

    const { data: revisions, isLoading: isRevisionLoading } = useQuery({
        queryKey: getRevisionsQueryKey(definitionId),
        queryFn: getRevisions,
    });

    return {
        revisions,
        isRevisionLoading,
    };
};
