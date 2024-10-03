import { useCreateService } from "@voloiq/service";
import type { Requirement, RequirementInsert } from "./apiModels";

export type UseBulkAddRequirementsOptions = {
    definitionId: string;
};
export const useBulkAddRequirements = (options: UseBulkAddRequirementsOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkAddRequirements } = useCreateService<RequirementInsert[], Requirement[]>({
        route: `/ftd/v1/definitions/${definitionId}/requirements`,
    });

    return { bulkAddRequirements };
};
