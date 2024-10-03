import { useGetAllApplicableRequirementsQuery } from "@voloiq/flight-test-definition-api/v1";

export type UseApplicableRequirementsOptions = {
    procedureId: string;
    definitionId: string;
};

export const useApplicableRequirements = (options: UseApplicableRequirementsOptions) => {
    const { procedureId, definitionId } = options;

    const { applicableRequirements = [] } = useGetAllApplicableRequirementsQuery({
        definitionId,
        procedureId,
        params: {
            size: 100_000,
        },
    });

    const applicableApplicableRequirements = applicableRequirements.filter(
        (applicableRequirement) => applicableRequirement.applicable
    );

    return { applicableRequirements: applicableApplicableRequirements };
};
