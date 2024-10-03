import { useCallback } from "react";
import { useParamsSerializer } from "../utils/useParamsSerializer";
import type { ServiceOptions } from "./ServiceOptions";
import { useAxios } from "./axios/useAxios";
import { useService } from "./context/useService";
import { getStatusCode, useHandleError } from "./useHandleError";
import { useServiceState } from "./useServiceState";

export type UseDeleteServiceProps = ServiceOptions;
export const useDeleteService = <DeleteResponseDTO extends {}, DeleteRequestDTO = undefined>(
    props: UseDeleteServiceProps
) => {
    const { route, config } = props;
    const { baseUrl } = useService();
    const paramsSerializer = useParamsSerializer();

    const [{ loading, error: axiosError, response }, sendRequest, , traceId] = useAxios<DeleteResponseDTO>(
        {
            paramsSerializer,
            baseURL: baseUrl,
            url: route,
            withCredentials: true,
            ...config,
            method: "DELETE",
        },
        {
            manual: true,
            useCache: false,
        }
    );
    const state = useServiceState({ loading, error: axiosError });

    const error = useHandleError(axiosError, traceId);

    const sendRequestById = useCallback(
        (id?: number | string, options?: { body: DeleteRequestDTO }) =>
            sendRequest({
                url: `${route}${id ? `/${id}` : ""}`,
                data: options?.body,
            }),
        [sendRequest, route]
    );

    return {
        sendRequest,
        sendRequestById,
        error,
        state,
        statusCode: getStatusCode<DeleteResponseDTO>(response, axiosError),
        traceId,
    };
};
