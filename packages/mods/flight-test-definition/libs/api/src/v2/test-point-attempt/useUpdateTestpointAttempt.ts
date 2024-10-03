import { AxiosRequestConfig, AxiosResponse, ResponseEnvelope, useService } from "@voloiq/service";
import type { TestPointAttemptInsert, TestPointAttemptPatch } from "./apiModels";

export type UseUpdateTestpointAttemptOptions = {
    testPointId: string;
    attemptId: string;
};

export type EditTestPointAttemptRequest = AxiosRequestConfig<TestPointAttemptPatch> | undefined;
export type EditTestPointAttemptResponse = TestPointAttemptInsert | undefined;

export const useUpdateTestpointAttempt = (options: UseUpdateTestpointAttemptOptions) => {
    const { testPointId, attemptId } = options;

    const { axiosInstance, baseUrl } = useService();

    const editTestPointAttempt = async (config: EditTestPointAttemptRequest): Promise<EditTestPointAttemptResponse> => {
        const {
            data: { data },
            // We cannot use the usePatch hook here directly, because this causes the request to be cancelled
            // if the hook unmounts while the request is still pending
        } = await axiosInstance.patch<
            ResponseEnvelope<TestPointAttemptInsert>,
            AxiosResponse<ResponseEnvelope<TestPointAttemptInsert>>,
            TestPointAttemptPatch
        >(`${baseUrl}/ftd/v2/test-points/${testPointId}/attempts/${attemptId}`, config?.data, {
            ...config,
            withCredentials: true,
        });

        return data;
    };

    return { editTestPointAttempt };
};
