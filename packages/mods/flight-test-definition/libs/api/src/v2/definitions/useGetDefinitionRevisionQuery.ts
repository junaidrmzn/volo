import { useQuery } from "@tanstack/react-query";
import type { UseGetDefinitionRevisionOptions } from "./useGetDefinitionRevision";
import { useGetDefinitionRevision } from "./useGetDefinitionRevision";

export const getDefinitionRevisionQueryKey = (definitionId: string, revisionId: string) => [
    "definition",
    definitionId,
    revisionId,
];

export const useGetDefinitionRevisionQuery = (options: UseGetDefinitionRevisionOptions) => {
    const { definitionId, revisionId } = options;

    const { getDefinitionRevision } = useGetDefinitionRevision({ ...options, manual: true, definitionId, revisionId });

    const {
        data: definitionRevision,
        refetch: refetchDefinitionRevision,
        isLoading: isRevisionLoading,
    } = useQuery({
        queryKey: getDefinitionRevisionQueryKey(definitionId, revisionId),
        queryFn: getDefinitionRevision,
    });

    return { definitionRevision, getDefinitionRevision, refetchDefinitionRevision, isRevisionLoading };
};
