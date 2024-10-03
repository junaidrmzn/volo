import { useCreateService } from "@voloiq/service";
import { TestHazardAssessment, TestHazardAssessmentInsert } from "./apiModels";

export const useBulkCreateTestHazardAssessments = () => {
    const { sendRequest } = useCreateService<TestHazardAssessmentInsert[], TestHazardAssessment[]>({
        route: "/ftd/v1/test-hazard-assessments",
    });

    return { addTestHazardAssessment: sendRequest };
};
