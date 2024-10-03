import { isProcedureGuard, useGetRevisionProcedureQuery } from "@voloiq/flight-test-definition-api/v1";
import { useNavigate } from "@voloiq/routing";
import { ProcedureChangesReview } from "./ProceduresChangesReview";

type ProcedureRevisionWrapperProps = {
    definitionId: string;
    procedureId: string;
    revisionString?: string;
};
export const ProcedureRevisionWrapper = (props: ProcedureRevisionWrapperProps) => {
    const { definitionId, procedureId, revisionString } = props;
    const navigate = useNavigate();
    const { procedure } = useGetRevisionProcedureQuery({ definitionId, procedureId, revisionString });
    const procedureChangesOverview = isProcedureGuard(procedure) ? procedure : undefined;

    const navigateBack = () => navigate(`../overview/${definitionId}`);

    return (
        <ProcedureChangesReview
            procedureOverview={procedureChangesOverview}
            definitionId={definitionId}
            procedureId={procedureId}
            navigateBack={navigateBack}
        />
    );
};
