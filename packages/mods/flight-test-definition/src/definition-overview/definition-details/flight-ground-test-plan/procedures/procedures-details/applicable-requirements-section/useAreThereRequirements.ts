import { P, match } from "ts-pattern";
import {
    useGetAllRequirementsQuery,
    useGetAssignedWindchillRequirementsQuery,
} from "@voloiq/flight-test-definition-api/v1";

export type UseAreThereRequirementsOptions = {
    definitionId: string;
};

export const useAreThereRequirements = (options: UseAreThereRequirementsOptions) => {
    const { definitionId } = options;

    const { pagination: manualRequirementsPagination } = useGetAllRequirementsQuery({ definitionId });
    const { pagination: windchillRequirementsPagination } = useGetAssignedWindchillRequirementsQuery({
        definitionId,
        manual: false,
        params: {
            size: 100_000,
        },
    });

    return match({ manualRequirementsPagination, windchillRequirementsPagination })
        .with(
            {
                manualRequirementsPagination: P.union({ totalElements: P.union(P.nullish, 0) }, P.nullish),
                windchillRequirementsPagination: P.union({ totalElements: P.union(P.nullish, 0) }, P.nullish),
            },
            () => false
        )
        .otherwise(() => true);
};
