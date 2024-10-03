import { useCreateService } from "@voloiq/service";
import type { TestPointAttempt, TestPointAttemptInsert } from "./apiModels";

type UseAddTestpointAttemptOptions = {
    testPointId: string;
};

export const useAddTestpointAttempt = (options: UseAddTestpointAttemptOptions) => {
    const { testPointId } = options;

    const { sendRequest: addTestpointAttempt, data } = useCreateService<TestPointAttemptInsert, TestPointAttempt>({
        route: `/ftd/v2/test-points/${testPointId}/attempts`,
    });

    return { addTestpointAttempt, data };
};
