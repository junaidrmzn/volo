import type { AxiosRequestConfig } from "axios";
import type { RefetchOptions, UseAxiosResult } from "axios-hooks";
import { useCallback } from "react";
import type { ResponseEnvelope } from "./types/ResponseEnvelope";

export const useWrappedSendRequest = <RequestDTO, ResponseDTO>(
    sendRequest: UseAxiosResult<ResponseEnvelope<ResponseDTO>, RequestDTO>[1]
) =>
    useCallback(
        (config?: AxiosRequestConfig<RequestDTO>, options?: RefetchOptions): Promise<ResponseDTO | undefined> =>
            sendRequest(config, options).then((response) => response.data.data),
        [sendRequest]
    );

export const useWrappedSendRequestWithResponseEnvelope = <RequestDTO, ResponseDTO>(
    sendRequest: UseAxiosResult<ResponseEnvelope<ResponseDTO>, RequestDTO>[1]
) =>
    useCallback(
        (config?: AxiosRequestConfig<RequestDTO>, options?: RefetchOptions): Promise<ResponseEnvelope<ResponseDTO>> =>
            sendRequest(config, options).then((response) => response.data),
        [sendRequest]
    );
