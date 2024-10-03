import { useQuery } from "@tanstack/react-query";
import type { UseGetAssignedTestHazardAssessmentsOptions } from "./useGetAssignedTestHazardAssessments";
import { useGetAssignedTestHazardAssessments } from "./useGetAssignedTestHazardAssessments";

export const getAssignedTestHazardAssessmentsQueryKey = (definitionId?: string) => [
    "assignedTestHazardAssessments",
    definitionId,
];

export type UseGetAssignedTestHazardAssessmentsQueryOptions = UseGetAssignedTestHazardAssessmentsOptions;

export const useGetAssignedTestHazardAssessmentsQuery = (options: UseGetAssignedTestHazardAssessmentsQueryOptions) => {
    const { getAssignedTestHazardAssessmentsWithResponseEnvelope } = useGetAssignedTestHazardAssessments(options);
    const { data, isLoading, ...rest } = useQuery({
        queryKey: getAssignedTestHazardAssessmentsQueryKey(options.definitionId),
        queryFn: getAssignedTestHazardAssessmentsWithResponseEnvelope,
    });

    return { testHazardAssessments: data?.data || [], isLoading, pagination: data?.pagination, ...rest };
};
