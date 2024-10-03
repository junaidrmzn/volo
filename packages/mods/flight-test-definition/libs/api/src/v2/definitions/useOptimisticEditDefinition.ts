import { ApiError, useOptimisticEdit } from "@voloiq/utils";
import { useEditDefinition } from "./useEditDefinition";
import { getDefinitionQueryKey } from "./useGetDefinitionQuery";

export type UseOptimisticEditDefinition = {
    definitionId: string;
    onError?: (error: ApiError) => void;
    onSuccess?: () => void;
};

export const useOptimisticEditDefinition = (options: UseOptimisticEditDefinition) => {
    const { definitionId, onError, onSuccess } = options;

    const { editDefinition } = useEditDefinition(definitionId);
    const { optimisticEdit: optimisticEditDefinition } = useOptimisticEdit({
        editResource: editDefinition,
        onError,
        onSuccess,
        queryKey: getDefinitionQueryKey(definitionId),
    });

    return { optimisticEditDefinition };
};
