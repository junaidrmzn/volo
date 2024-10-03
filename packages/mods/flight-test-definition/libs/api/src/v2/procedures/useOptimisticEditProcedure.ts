import { useOptimisticEdit } from "@voloiq/utils";
import { getProcedureQueryKey } from "./getProcedureQueryKey";
import { useEditProcedure } from "./useEditProcedure";

export type UseOptimisticEditProcedure = {
    definitionId: string;
    procedureId: string;
    onError?: () => void;
};

export const useOptimisticEditProcedure = (options: UseOptimisticEditProcedure) => {
    const { definitionId, procedureId, onError } = options;

    const { editProcedure } = useEditProcedure({ definitionId, procedureId });
    const { optimisticEdit: optimisticEditProcedure } = useOptimisticEdit({
        editResource: editProcedure,
        onError,
        queryKey: getProcedureQueryKey(procedureId),
    });

    return { optimisticEditProcedure };
};
