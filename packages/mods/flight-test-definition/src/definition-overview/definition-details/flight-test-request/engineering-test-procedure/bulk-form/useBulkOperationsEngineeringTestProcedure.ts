import {
    EngineeringTestProcedureInsert,
    useBulkCreateEngineeringTestProcedure,
    useBulkDeleteEngineeringTestProcedure,
    useBulkPatchEngineeringTestProcedure,
} from "@voloiq/flight-test-definition-api/v1";
import { useDefinitionEditSessionId } from "../../../definition-edit-session-id-context/useDefinitionEditSessionId";

export type UseBulkOperationsEngineeringTestProcedure = {
    definitionId: string;
};

export const useBulkOperationsEngineeringTestProcedure = (props: UseBulkOperationsEngineeringTestProcedure) => {
    const { definitionId } = props;
    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();
    const { bulkAddEngineeringTestProcedures } = useBulkCreateEngineeringTestProcedure({ definitionId });
    const { bulkUpdateEngineeringTestProcedures } = useBulkPatchEngineeringTestProcedure({ definitionId });
    const { bulkDeleteEngineeringTestProcedures } = useBulkDeleteEngineeringTestProcedure({ definitionId });

    const onBulkAddEngineeringTestProcedures = async (data: EngineeringTestProcedureInsert[]) => {
        await bulkAddEngineeringTestProcedures({ data, params: { editSessionId } });
    };

    const onBulkDeleteEngineeringTestProcedures = async (data: string[]) => {
        await bulkDeleteEngineeringTestProcedures({ data, params: { editSessionId } });
    };

    const onBulkEditEngineeringTestProcedures = async (data: EngineeringTestProcedureInsert[]) => {
        await bulkUpdateEngineeringTestProcedures({ data, params: { editSessionId } });
    };
    return {
        onBulkAddEngineeringTestProcedures,
        onBulkDeleteEngineeringTestProcedures,
        onBulkEditEngineeringTestProcedures,
    };
};
