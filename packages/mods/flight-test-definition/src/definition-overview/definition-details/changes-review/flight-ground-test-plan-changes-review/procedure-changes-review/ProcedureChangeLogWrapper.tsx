import { isProcedureGuard, useGetChangeLogDetailsQuery } from "@voloiq/flight-test-definition-api/v1";
import { ProcedureChangesReview } from "./ProceduresChangesReview";

type ProcedureChangeLogWrapperProps = {
    definitionId: string;
    referenceId: string;
    procedureId?: string;
};
export const ProcedureChangeLogWrapper = (props: ProcedureChangeLogWrapperProps) => {
    const { definitionId, referenceId, procedureId } = props;

    const { changeLog } = useGetChangeLogDetailsQuery({ definitionId, referenceId });

    const procedureChangesOverview = isProcedureGuard(changeLog?.entity) ? changeLog?.entity : undefined;
    return (
        <ProcedureChangesReview
            procedureOverview={procedureChangesOverview}
            definitionId={definitionId}
            procedureId={procedureId}
        />
    );
};
