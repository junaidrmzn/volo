import { useParamsSerializer } from "../utils/useParamsSerializer";
import type { ServiceOptions } from "./ServiceOptions";
import { useAxios } from "./axios/useAxios";
import { useService } from "./context/useService";
import type { ResponseEnvelope } from "./types/ResponseEnvelope";
import { getStatusCode, useHandleError } from "./useHandleError";
import { useServiceState } from "./useServiceState";
import { useWrappedSendRequest } from "./useWrappedSendRequest";

export type UseCreateServiceProps = ServiceOptions;

export const useCreateService = <CreateDTO extends {}, CreateResponseDTO extends {}>(props: UseCreateServiceProps) => {
    const { route, config, options, params } = props;
    const { baseUrl } = useService();
    const paramsSerializer = useParamsSerializer();

    const [{ loading, error: axiosError, data, response }, sendRequest, , traceId] = useAxios<
        ResponseEnvelope<CreateResponseDTO>,
        CreateDTO
    >(
        {
            paramsSerializer,
            params,
            baseURL: baseUrl,
            url: route,
            withCredentials: true,
            ...config,
            method: "POST",
        },
        {
            manual: true,
            useCache: false,
            ...options,
        }
    );
    const state = useServiceState({ loading, error: axiosError });

    const error = useHandleError<CreateResponseDTO>(axiosError, traceId);

    const wrappedSendRequest = useWrappedSendRequest<CreateDTO, CreateResponseDTO>(sendRequest);

    return {
        sendRequest: wrappedSendRequest,
        data: data?.data,
        error,
        state,
        statusCode: getStatusCode<CreateResponseDTO>(response, axiosError),
        traceId,
    };
};
