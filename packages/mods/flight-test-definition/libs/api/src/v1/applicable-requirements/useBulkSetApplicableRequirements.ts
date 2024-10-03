import { useCreateService } from "@voloiq/service";
import type { ApplicableRequirementInsert } from "./apiModels";

export type UseBulkSetApplicableRequirementsOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkSetApplicableRequirements = (options: UseBulkSetApplicableRequirementsOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkSetApplicableRequirements } = useCreateService<ApplicableRequirementInsert[], {}>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/applicable-requirements`,
    });

    return { bulkSetApplicableRequirements };
};
