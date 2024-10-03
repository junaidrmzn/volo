import {
    useBulkAddProcedures,
    useBulkDeleteProcedures,
    useBulkEditProcedures,
} from "@voloiq/flight-test-definition-api/v2";
import type { OnBulkAdd, OnBulkDelete, OnBulkEdit } from "@voloiq/form";
import { useDefinition } from "../../../definition-context/useDefinition";
import { useDefinitionEditSessionId } from "../../../definition-edit-session-id-context/useDefinitionEditSessionId";
import type { ProcedureFormSchema } from "./useProcedureFormSchema";

export const useProceduresOnBulkOperations = () => {
    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { bulkDeleteProcedures } = useBulkDeleteProcedures({ definitionId });
    const { bulkEditProcedures } = useBulkEditProcedures({ definitionId });
    const { bulkAddProcedures } = useBulkAddProcedures({ definitionId });
    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();

    const onBulkDeleteProcedures: OnBulkDelete = async (data) => {
        await bulkDeleteProcedures({ data, params: { editSessionId } });
    };
    const onBulkAddProcedures: OnBulkAdd<ProcedureFormSchema> = async (data) => {
        await bulkAddProcedures({ data, params: { editSessionId } });
    };
    const onBulkEditProcedures: OnBulkEdit<ProcedureFormSchema> = async (data) => {
        await bulkEditProcedures({ data, params: { editSessionId } });
    };

    return { onBulkAddProcedures, onBulkDeleteProcedures, onBulkEditProcedures };
};
