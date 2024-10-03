import { P, match } from "ts-pattern";
import { useGetAllRequirementsQuery } from "@voloiq/flight-test-definition-api/v1";

export type UseManualRequirementsOptions = {
    definitionId: string;
};

export const useManualRequirements = (options: UseManualRequirementsOptions) => {
    const { definitionId } = options;
    const {
        requirements,
        pagination: manualrequirementsPagination,
        isLoading,
    } = useGetAllRequirementsQuery({
        definitionId,
        manual: false,
        pagination: {
            size: 100_000,
        },
    });

    const manualRequirementsCount = match(manualrequirementsPagination)
        .with({ totalElements: P.not(P.nullish) }, (pagination) => pagination.totalElements)
        .otherwise(() => 0);

    return { manualRequirements: requirements, manualRequirementsCount, isLoading };
};
