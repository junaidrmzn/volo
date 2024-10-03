import type { RequirementInsert, RequirementPatch } from "@voloiq-typescript-api/ftd-types/dist";
import {
    useBulkAddRequirements,
    useBulkDeleteRequirements,
    useBulkEditRequirements,
} from "@voloiq/flight-test-definition-api/v1";
import { useDefinitionEditSessionId } from "../../../../definition-edit-session-id-context/useDefinitionEditSessionId";

type RequirementPatchWithId = RequirementPatch & { id: string };

type useRequirementsOnBulkOperationsOptions = {
    definitionId: string;
};

export const useRequirementsOnBulkOperations = (options: useRequirementsOnBulkOperationsOptions) => {
    const { definitionId } = options;

    const { bulkAddRequirements } = useBulkAddRequirements({ definitionId });
    const { bulkDeleteRequirements } = useBulkDeleteRequirements({ definitionId });
    const { bulkEditRequirements } = useBulkEditRequirements({ definitionId });
    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();

    const onBulkAddRequirements = async (data: RequirementInsert[]) => {
        await bulkAddRequirements({ data, params: { editSessionId } });
    };

    const onBulkDeleteRequirements = async (data: string[]) => {
        await bulkDeleteRequirements({ data, params: { editSessionId } });
    };

    const onBulkEditRequirements = async (data: RequirementPatchWithId[]) => {
        await bulkEditRequirements({ data, params: { editSessionId } });
    };

    return {
        onBulkAddRequirements,
        onBulkDeleteRequirements,
        onBulkEditRequirements,
    };
};
