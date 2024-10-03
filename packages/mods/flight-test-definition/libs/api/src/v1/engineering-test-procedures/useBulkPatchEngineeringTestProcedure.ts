import { usePatchService } from "@voloiq/service";
import { EngineeringTestProcedure } from "./apiModels";

export type UseBulkPatchEngineeringTestProcedureProps = {
    definitionId: string;
};

export const useBulkPatchEngineeringTestProcedure = (props: UseBulkPatchEngineeringTestProcedureProps) => {
    const { definitionId } = props;
    const { sendRequest: bulkUpdateEngineeringTestProcedures } = usePatchService<
        Partial<EngineeringTestProcedure>[],
        EngineeringTestProcedure[]
    >({
        route: `/ftd/v1/definitions/${definitionId}/engineering-test-procedures`,
    });

    return { bulkUpdateEngineeringTestProcedures };
};
