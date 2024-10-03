import { useGetAllProcedureRevisionsQuery } from "@voloiq/flight-test-definition-api/v1";
import { useNavigate } from "@voloiq/routing";

type UseProcedureRevisionDropdown = {
    definitionId: string;
    procedureId: string;
    activeRevision?: string;
};
export const useProcedureRevisionDropdown = (options: UseProcedureRevisionDropdown) => {
    const { definitionId, procedureId } = options;
    const navigate = useNavigate();

    const { procedureRevisions } = useGetAllProcedureRevisionsQuery({ definitionId, procedureId });

    const navigateToRevision = (revisionValue?: string) => {
        const revision = procedureRevisions?.find((revision) => revision.revision === revisionValue);
        if (!revision?.released) {
            navigate(`../overview/${definitionId}/procedures/${procedureId}?entityType=procedure`);
        } else {
            navigate(
                `../overview/${definitionId}/readonly/${revision?.revision}/procedures/${procedureId}?entityType=procedure&procedureIndex=1`
            );
        }
    };

    return {
        procedureRevisions,
        navigateToRevision,
    };
};
