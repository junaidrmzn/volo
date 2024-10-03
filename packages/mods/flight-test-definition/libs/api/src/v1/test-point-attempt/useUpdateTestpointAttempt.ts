import { useAxiosService } from "@voloiq/service";
import type { TestPointAttemptPatch } from "./apiModels";

type UseUpdateTestpointAttemptOptions = {
    testPointId: string;
};

export const useUpdateTestpointAttempt = (options: UseUpdateTestpointAttemptOptions) => {
    const { testPointId } = options;
    const { axiosPatch } = useAxiosService();

    return {
        updateTestpointAttemptById: (attemptId: string, data: TestPointAttemptPatch) =>
            axiosPatch({
                path: `/ftd/v1/test-points/${testPointId}/attempts/${attemptId}`,
                data,
            }),
    };
};
