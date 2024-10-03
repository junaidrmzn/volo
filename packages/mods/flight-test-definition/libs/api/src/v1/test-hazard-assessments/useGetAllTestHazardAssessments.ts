import { useGetAllService } from "@voloiq/service";
import { TestHazardAssessment } from "./apiModels";

export type UseGetAllTestHazardAssessmentsOptions = {
    manual?: boolean;
    params?: {
        filter?: string;
        size?: number;
        page?: number;
        inactive?: boolean;
        orderBy?: string;
    };
};

export const useGetAllTestHazardAssessments = (options: UseGetAllTestHazardAssessmentsOptions = {}) => {
    const { manual = true, params: defaultParams = {} } = options;
    const { sendRequestWithResponseEnvelope } = useGetAllService<TestHazardAssessment>({
        route: "/ftd/v1/test-hazard-assessments",
        options: { manual },
        params: defaultParams,
    });

    const getAllTestHazardAssessmentsWithParams = (
        overriddenParams: UseGetAllTestHazardAssessmentsOptions["params"]
    ) => {
        return sendRequestWithResponseEnvelope({
            params: {
                ...defaultParams,
                ...overriddenParams,
            },
        });
    };

    return { getAllTestHazardAssessmentsWithParams };
};
