import { useGetAllService } from "@voloiq/service";
import { ProcedureRevision } from "./apiModels";

export type UseGetAllProcedureRevisionsOptions = {
    definitionId: string;
    procedureId: string;
    manual?: boolean;
};

export const useGetAllProcedureRevisions = (options: UseGetAllProcedureRevisionsOptions) => {
    const { definitionId, manual = true, procedureId } = options;
    const { data, sendRequest } = useGetAllService<ProcedureRevision>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/revisions`,
        options: { manual },
    });

    return { data, sendRequest };
};
