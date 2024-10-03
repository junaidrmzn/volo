import type { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { useParamsSerializer } from "../utils/useParamsSerializer";
import type { ServiceOptions } from "./ServiceOptions";
import { useAxios } from "./axios/useAxios";
import { useService } from "./context/useService";
import type { ResponseEnvelope } from "./types/ResponseEnvelope";
import { getStatusCode, useHandleError } from "./useHandleError";
import { useServiceState } from "./useServiceState";
import { useWrappedSendRequest } from "./useWrappedSendRequest";

export type UseUpdateServiceOptions = ServiceOptions;

export const useUpdateService = <UpdateDTO extends {}, UpdateResponseDTO extends {}>(
    props: UseUpdateServiceOptions
) => {
    const { route, options, config, params } = props;
    const { baseUrl } = useService();
    const paramsSerializer = useParamsSerializer();

    const [{ loading, error: axiosError, data, response }, sendRequest, , traceId] = useAxios<
        ResponseEnvelope<UpdateResponseDTO>,
        UpdateDTO
    >(
        {
            paramsSerializer,
            params,
            baseURL: baseUrl,
            url: route,
            withCredentials: true,
            ...config,
            method: "PUT",
        },
        {
            manual: true,
            useCache: false,
            ...options,
        }
    );
    const state = useServiceState({ loading, error: axiosError });

    const error = useHandleError<UpdateResponseDTO>(axiosError, traceId);

    const wrappedSendRequest = useWrappedSendRequest<UpdateDTO, UpdateResponseDTO>(sendRequest);

    const sendRequestById = useCallback(
        (id: number | string, config: AxiosRequestConfig<UpdateDTO> | undefined) =>
            wrappedSendRequest({
                url: `${route}/${id}`,
                ...config,
            }),
        [wrappedSendRequest, route]
    );

    return {
        sendRequest: wrappedSendRequest,
        sendRequestById,
        data: data?.data,
        error,
        state,
        statusCode: getStatusCode<UpdateResponseDTO>(response, axiosError),
        traceId,
    };
};
