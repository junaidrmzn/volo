import { usePatchService } from "@voloiq/service";
import { TestHazardAssessment } from "./apiModels";

export const usePatchTestHazardAssessment = (resourceId: string) => {
    return usePatchService<Partial<TestHazardAssessment>, TestHazardAssessment>({
        route: "/ftd/v1/test-hazard-assessments",
        resourceId,
    });
};
