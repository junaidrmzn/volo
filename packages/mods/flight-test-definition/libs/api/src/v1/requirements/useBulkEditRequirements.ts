import { usePatchService } from "@voloiq/service";
import type { Requirement, RequirementPatchBulk } from "./apiModels";

export type UseBulkEditRequirementsOptions = {
    definitionId: string;
};
export const useBulkEditRequirements = (options: UseBulkEditRequirementsOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkEditRequirements } = usePatchService<RequirementPatchBulk[], Requirement[]>({
        route: `/ftd/v1/definitions/${definitionId}/requirements`,
    });

    return { bulkEditRequirements };
};
