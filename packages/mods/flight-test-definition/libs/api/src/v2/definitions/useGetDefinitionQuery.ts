import { useQuery } from "@tanstack/react-query";
import type { UseGetDefinitionOptions } from "./useGetDefinition";
import { useGetDefinition } from "./useGetDefinition";

export const getDefinitionQueryKey = (definitionId: string) => ["definition", definitionId];

export const useGetDefinitionQuery = (options: UseGetDefinitionOptions) => {
    const { definitionId } = options;

    const { getDefinition } = useGetDefinition({ ...options, manual: true });

    const {
        data: definition,
        refetch: refetchDefinition,
        isLoading: isDefinitionLoading,
    } = useQuery({
        queryKey: getDefinitionQueryKey(definitionId),
        queryFn: getDefinition,
    });

    return { definition, getDefinition, refetchDefinition, isDefinitionLoading };
};
