import { useCreateService } from "@voloiq/service";
import { TestHazardAssessment } from "./apiModels";

export type UseBulkAddTestHazardAssessmentsOptions = {
    definitionId: string;
};

export const useAssignTestHazardAssessments = (options: UseBulkAddTestHazardAssessmentsOptions) => {
    const { definitionId } = options;

    const { sendRequest: assignTestHazardAssessments, state } = useCreateService<string[], TestHazardAssessment[]>({
        route: `/ftd/v1/definitions/${definitionId}/test-hazard-assessments`,
    });

    return { assignTestHazardAssessments, isLoading: state === "pending" };
};
