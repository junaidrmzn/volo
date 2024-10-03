import type { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { useParamsSerializer } from "../utils/useParamsSerializer";
import type { ResourceServiceOptions, ServiceOptions } from "./ServiceOptions";
import { useAxios } from "./axios/useAxios";
import { useService } from "./context/useService";
import type { ResponseEnvelope } from "./types/ResponseEnvelope";
import { getStatusCode, useHandleError } from "./useHandleError";
import { useServiceState } from "./useServiceState";
import { useWrappedSendRequest } from "./useWrappedSendRequest";

export type UsePatchServiceOptions = ServiceOptions & Partial<ResourceServiceOptions>;

export const usePatchService = <PatchDTO extends {}, PatchResponseDTO extends {}>(props: UsePatchServiceOptions) => {
    const { route, options, config, params, resourceId } = props;
    const { baseUrl } = useService();
    const paramsSerializer = useParamsSerializer();

    const [{ loading, error: axiosError, data, response }, sendRequest, , traceId] = useAxios<
        ResponseEnvelope<PatchResponseDTO>,
        PatchDTO
    >(
        {
            paramsSerializer,
            params,
            baseURL: baseUrl,
            url: resourceId ? `${route}/${resourceId}` : route,
            withCredentials: true,
            ...config,
            method: "PATCH",
        },
        {
            manual: true,
            useCache: false,
            ...options,
        }
    );
    const state = useServiceState({ loading, error: axiosError });

    const error = useHandleError<PatchResponseDTO>(axiosError, traceId);

    const wrappedSendRequest = useWrappedSendRequest<PatchDTO, PatchResponseDTO>(sendRequest);

    const sendRequestById = useCallback(
        (id?: number | string, config?: AxiosRequestConfig<PatchDTO> | undefined) =>
            wrappedSendRequest({
                url: `${route}${id ? `/${id}` : ""}`,
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
        statusCode: getStatusCode<PatchResponseDTO>(response, axiosError),
        traceId,
    };
};
