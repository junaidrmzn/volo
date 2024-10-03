import { useGetAllService } from "@voloiq/service";
import type { TestHazardAssessment } from "./apiModels";

export type UseGetAssignedTestHazardAssessmentsOptions = {
    definitionId: string;
    manual?: boolean;
    pagination?: {
        size?: number;
        page?: number;
    };
    params?: {
        filter?: string;
    };
};

export const useGetAssignedTestHazardAssessments = (options: UseGetAssignedTestHazardAssessmentsOptions) => {
    const { definitionId, manual = true, pagination, params = {} } = options;

    const {
        sendRequestWithResponseEnvelope: getAssignedTestHazardAssessmentsWithResponseEnvelope,
        sendRequest: getAssignedTestHazardAssessments,
    } = useGetAllService<TestHazardAssessment>({
        // TODO: verify endpoint and update later if necessary, once API is ready.
        route: `/ftd/v1/definitions/${definitionId}/test-hazard-assessments`,
        options: { manual },
        params: {
            orderBy: "createTime:asc",
            size: pagination?.size || 50,
            page: pagination?.page || 1,
            ...(params.filter?.length && params.filter?.length > 0 ? { filter: params?.filter } : undefined),
        },
    });

    return { getAssignedTestHazardAssessments, getAssignedTestHazardAssessmentsWithResponseEnvelope };
};
