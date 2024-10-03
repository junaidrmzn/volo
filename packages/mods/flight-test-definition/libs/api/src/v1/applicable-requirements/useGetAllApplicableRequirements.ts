import { useGetAllService } from "@voloiq/service";
import type { ApplicableRequirement } from "./apiModels";

export type UseGetAllApplicableRequirementsOptions = {
    definitionId: string;
    procedureId: string;
    manual?: boolean;
    params?: Record<string, string | number>;
};

export const useGetAllApplicableRequirements = (options: UseGetAllApplicableRequirementsOptions) => {
    const { definitionId, procedureId, manual = true, params } = options;

    const { data: applicableRequirements, sendRequest: getAllApplicableRequirements } =
        useGetAllService<ApplicableRequirement>({
            route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/applicable-requirements`,
            options: { manual },
            params,
        });

    return { applicableRequirements, getAllApplicableRequirements };
};
