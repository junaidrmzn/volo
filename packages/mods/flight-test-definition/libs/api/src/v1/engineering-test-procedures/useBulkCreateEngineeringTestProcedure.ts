import { useCreateService } from "@voloiq/service";
import { EngineeringTestProcedure, EngineeringTestProcedureInsert } from "./apiModels";

export type UseBulkCreateEngineeringTestProcedureProps = {
    definitionId: string;
};

export const useBulkCreateEngineeringTestProcedure = (props: UseBulkCreateEngineeringTestProcedureProps) => {
    const { definitionId } = props;
    const { sendRequest: bulkAddEngineeringTestProcedures } = useCreateService<
        EngineeringTestProcedureInsert[],
        EngineeringTestProcedure[]
    >({
        route: `/ftd/v1/definitions/${definitionId}/engineering-test-procedures`,
    });

    return { bulkAddEngineeringTestProcedures };
};
