import { useDeleteService } from "@voloiq/service";

export const useSoftDeleteTestHazardAssessment = (testHazardAssessmentId: string) => {
    return useDeleteService({
        route: `/ftd/v1/test-hazard-assessments/${testHazardAssessmentId}`,
    });
};
