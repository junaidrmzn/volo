import { ApiError, useOptimisticEdit } from "@voloiq/utils";
import type { EditProcedureResponse } from "./useEditProcedure";
import { useEditProcedure } from "./useEditProcedure";
import { getProcedureQueryKey } from "./useGetProcedureQuery";

export type UseOptimisticEditProcedure = {
    definitionId: string;
    procedureId: string;
    onError?: (error: ApiError) => void;
    onSuccess?: () => void;
};

export const useOptimisticEditProcedure = (options: UseOptimisticEditProcedure) => {
    const { definitionId, procedureId, onError, onSuccess } = options;

    const { editProcedure } = useEditProcedure({ definitionId, procedureId });
    const { optimisticEdit: optimisticEditProcedure } = useOptimisticEdit<
        {},
        { data: {}; params?: {} },
        EditProcedureResponse
    >({
        editResource: editProcedure,
        onError,
        onSuccess,
        queryKey: getProcedureQueryKey(procedureId),
    });

    return { optimisticEditProcedure };
};
