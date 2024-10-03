import { useGetService } from "@voloiq/service";
import { TestHazardAssessment } from "./apiModels";

export const useGetTestHazardAssessment = () =>
    useGetService<TestHazardAssessment>({
        route: "/ftd/v1/test-hazard-assessments",
        resourceId: "",
        options: { manual: true },
    });
