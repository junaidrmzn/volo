import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteTestHazardAssessmentsOptions = {
    definitionId: string;
};
export const useUnassignTestHazardAssessments = (options: UseBulkDeleteTestHazardAssessmentsOptions) => {
    const { definitionId } = options;

    const { sendRequest: unassignTestHazardAssessments, state } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/definitions/${definitionId}/test-hazard-assessments`,
    });

    return { unassignTestHazardAssessments, isLoading: state === "pending" };
};
