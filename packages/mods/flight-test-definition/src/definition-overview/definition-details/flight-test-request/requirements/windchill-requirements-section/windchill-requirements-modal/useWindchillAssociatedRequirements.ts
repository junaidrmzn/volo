import { P, match } from "ts-pattern";
import { useGetAssignedWindchillRequirementsQuery } from "@voloiq/flight-test-definition-api/v1";

export type UseWindchillAssociatedRequirementsOptions = {
    definitionId: string;
};

export const useWindchillAssociatedRequirements = (options: UseWindchillAssociatedRequirementsOptions) => {
    const { definitionId } = options;
    const {
        assignedWindchillRequirements,
        pagination: windchillAssociatedRequirementsPagination,
        isLoading,
    } = useGetAssignedWindchillRequirementsQuery({
        definitionId,
        manual: false,
        params: {
            size: 100_000,
        },
    });

    const windchillAssociatedRequirementsCount = match(windchillAssociatedRequirementsPagination)
        .with({ totalElements: P.not(P.nullish) }, (pagination) => pagination.totalElements)
        .otherwise(() => 0);

    return {
        windchillAssociatedRequirements: assignedWindchillRequirements,
        windchillAssociatedRequirementsCount,
        isLoading,
    };
};
