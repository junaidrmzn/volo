import { useGetService } from "@voloiq/service";
import { ProceduresChangesOverview } from "./apiModels";

export type UseGetRevisionProcedureProps = {
    definitionId: string;
    revisionString?: string;
    procedureId: string;
    manual?: boolean;
};
export const useGetRevisionProcedure = (props: UseGetRevisionProcedureProps) => {
    const { definitionId, procedureId, revisionString, manual = true } = props;

    const { refetchData: refetchProcedure, data: procedure } = useGetService<ProceduresChangesOverview>({
        route: `/ftd/v1/definitions/${definitionId}/revisions/${revisionString}/procedures`,
        resourceId: procedureId,
        options: {
            manual,
        },
    });

    return { procedure, refetchProcedure };
};
