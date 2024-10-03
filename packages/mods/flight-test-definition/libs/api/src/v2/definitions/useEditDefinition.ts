import type { AxiosRequestConfig, AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import { useService } from "@voloiq/service";
import type { FlightTestDefinitionPatchRequestBody, FlightTestDefinitionResponseBody } from "./apiModels";

export type EditDefinitionRequest = AxiosRequestConfig<FlightTestDefinitionPatchRequestBody> | undefined;
export type EditDefinitionResponse = FlightTestDefinitionResponseBody | undefined;

export const useEditDefinition = (definitionId: string) => {
    const { axiosInstance, baseUrl } = useService();

    const editDefinition = async (config: EditDefinitionRequest): Promise<EditDefinitionResponse> => {
        const {
            data: { data },
            // We cannot use the usePatch hook here directly, because this causes the request to be cancelled
            // if the hook unmounts while the request is still pending
        } = await axiosInstance.patch<
            ResponseEnvelope<FlightTestDefinitionResponseBody>,
            AxiosResponse<ResponseEnvelope<FlightTestDefinitionResponseBody>>,
            FlightTestDefinitionPatchRequestBody
        >(`${baseUrl}/ftd/v2/definitions/${definitionId}`, config?.data, { ...config, withCredentials: true });

        return data;
    };

    return { editDefinition };
};
