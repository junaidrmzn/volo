import { usePatchService } from "@voloiq/service";
import { Procedure, ProcedurePatch } from "./apiModels";

export type UseBulkEditProceduresOptions = {
    definitionId: string;
};
export const useBulkEditProcedures = (options: UseBulkEditProceduresOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkEditProcedures } = usePatchService<ProcedurePatch[], Procedure[]>({
        route: `/ftd/v2/definitions/${definitionId}/procedures`,
    });

    return { bulkEditProcedures };
};
