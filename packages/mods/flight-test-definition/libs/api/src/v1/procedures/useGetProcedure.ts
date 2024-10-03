import { useGetService } from "@voloiq/service";
import type { ProcedureRead } from "./apiModels";

export type UseGetProcedureOptions = {
    definitionId: string;
    procedureId: string;
    manual?: boolean;
};

export const useGetProcedure = (options: UseGetProcedureOptions) => {
    const { definitionId, procedureId, manual = true } = options;

    const { data: procedure, refetchData: getProcedure } = useGetService<ProcedureRead>({
        route: `/ftd/v1/definitions/${definitionId}/procedures`,
        resourceId: procedureId,
        options: { manual },
    });

    return { procedure, getProcedure };
};
