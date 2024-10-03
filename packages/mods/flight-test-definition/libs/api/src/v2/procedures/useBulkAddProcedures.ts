import { useCreateService } from "@voloiq/service";
import { Procedure, ProcedureInsert } from "./apiModels";

export type UseBulkAddProceduresOptions = {
    definitionId: string;
};
export const useBulkAddProcedures = (options: UseBulkAddProceduresOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkAddProcedures } = useCreateService<ProcedureInsert[], Procedure[]>({
        route: `/ftd/v2/definitions/${definitionId}/procedures`,
    });

    return { bulkAddProcedures };
};
