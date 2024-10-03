import { useParamsSerializer } from "../utils/useParamsSerializer";
import type { ServiceOptions } from "./ServiceOptions";
import { useAxios } from "./axios/useAxios";
import { useService } from "./context/useService";
import type { ResponseEnvelope } from "./types/ResponseEnvelope";
import { getStatusCode, useHandleError } from "./useHandleError";
import { useServiceState } from "./useServiceState";
import { useWrappedSendRequest, useWrappedSendRequestWithResponseEnvelope } from "./useWrappedSendRequest";

export type UseGetAllServiceProps = ServiceOptions;

const emptyArray: never[] = [];

export const useGetAllService = <GetDTO>(props: UseGetAllServiceProps) => {
    const { params, route, options, config } = props;
    const { baseUrl } = useService();
    const paramsSerializer = useParamsSerializer();

    const [{ loading, error: axiosError, data, response }, sendRequest, , traceId] = useAxios<
        ResponseEnvelope<GetDTO[]>
    >(
        {
            paramsSerializer,
            params,
            baseURL: baseUrl,
            url: route,
            withCredentials: true,
            ...config,
            method: "GET",
        },
        {
            useCache: false,
            autoCancel: false,
            ...options,
        }
    );
    const state = useServiceState({ loading, error: axiosError });

    const error = useHandleError<GetDTO[]>(axiosError, traceId);

    const wrappedSendRequest = useWrappedSendRequest<never, GetDTO[]>(sendRequest);
    const wrappedSendRequestWithResponseEnvelope = useWrappedSendRequestWithResponseEnvelope<never, GetDTO[]>(
        sendRequest
    );

    return {
        data: data?.data ? data.data : emptyArray,
        pagination: data?.pagination,
        error,
        statusCode: getStatusCode<GetDTO[]>(response, axiosError),
        state,
        sendRequest: wrappedSendRequest,
        sendRequestWithResponseEnvelope: wrappedSendRequestWithResponseEnvelope,
        traceId,
    };
};
