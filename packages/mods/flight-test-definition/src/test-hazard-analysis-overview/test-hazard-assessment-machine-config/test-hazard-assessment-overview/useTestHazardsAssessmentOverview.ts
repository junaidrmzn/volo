import { useCallback } from "react";
import {
    TestHazardAssessment,
    useGetAllTestHazardAssessments,
    useGetTestHazardAssessment,
} from "@voloiq/flight-test-definition-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";

export const useTestHazardsAssessmentOverview = () => {
    const { getAllTestHazardAssessmentsWithParams } = useGetAllTestHazardAssessments();
    const { refetchDataWithResponseEnvelope } = useGetTestHazardAssessment();

    const fetchAllTestHazards = useCallback(
        (options: FetchAllResourceOptions<TestHazardAssessment>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            return getAllTestHazardAssessmentsWithParams({
                size,
                page,
                ...(filterSet && filterSet.filters.length > 0 && { filter: serializeFilters(filterSet) }),
                orderBy: sortingConfiguration
                    ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder.toLowerCase()}`
                    : undefined,
            });
        },
        [getAllTestHazardAssessmentsWithParams]
    );

    const fetchTestHazard = useCallback(
        (resourceId: string) =>
            refetchDataWithResponseEnvelope({ url: `/ftd/v1/test-hazard-assessments/${resourceId}` }),
        [refetchDataWithResponseEnvelope]
    );

    return { fetchAllTestHazards, fetchTestHazard };
};
