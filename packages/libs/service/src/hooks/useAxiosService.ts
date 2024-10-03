import type { AxiosRequestConfig } from "axios";
import { useCallback, useMemo } from "react";
import { paramsSerializer } from "../utils/useParamsSerializer";
import { useService } from "./context/useService";
import type { ResponseEnvelope } from "./types/ResponseEnvelope";

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type AxiosServiceRequestConfig<RequestDTO> = WithRequired<
    Omit<AxiosRequestConfig<RequestDTO>, "url">,
    "method"
> & { path: string };

export const useAxiosService = () => {
    const { axiosInstance, baseUrl } = useService();

    const customAxiosRequest = useCallback(
        <ResponseObject, RequestObject>(config: AxiosServiceRequestConfig<RequestObject>) =>
            axiosInstance.request<ResponseObject>({
                paramsSerializer,
                withCredentials: true,
                baseURL: baseUrl,
                url: config.path,
                ...config,
            }),
        [axiosInstance, baseUrl]
    );

    const axiosRequest = useCallback(
        <ResponseDTO, RequestDTO>(config: AxiosServiceRequestConfig<RequestDTO>) =>
            axiosInstance
                .request<ResponseEnvelope<ResponseDTO>>({
                    paramsSerializer,
                    withCredentials: true,
                    baseURL: baseUrl,
                    url: config.path,
                    ...config,
                })
                .then((response) => response.data),
        [axiosInstance, baseUrl]
    );

    const axiosGet = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ResponseDTO, RequestDTO = any>(config: Omit<AxiosServiceRequestConfig<RequestDTO>, "method">) =>
            axiosRequest<ResponseDTO, RequestDTO>({ method: "get", ...config }),
        [axiosRequest]
    );

    const axiosPost = useCallback(
        <ResponseDTO, RequestDTO>(config: Omit<AxiosServiceRequestConfig<RequestDTO>, "method">) =>
            axiosRequest<ResponseDTO, RequestDTO>({ method: "post", ...config }),
        [axiosRequest]
    );

    const axiosPut = useCallback(
        <ResponseDTO, RequestDTO>(config: Omit<AxiosServiceRequestConfig<RequestDTO>, "method">) =>
            axiosRequest<ResponseDTO, RequestDTO>({ method: "put", ...config }),
        [axiosRequest]
    );

    const axiosPatch = useCallback(
        <ResponseDTO, RequestDTO>(config: Omit<AxiosServiceRequestConfig<RequestDTO>, "method">) =>
            axiosRequest<ResponseDTO, RequestDTO>({ method: "patch", ...config }),
        [axiosRequest]
    );

    const axiosDelete = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ResponseDTO = any, RequestDTO = any>(config: Omit<AxiosServiceRequestConfig<RequestDTO>, "method">) =>
            axiosRequest<ResponseDTO, RequestDTO>({ method: "delete", ...config }),
        [axiosRequest]
    );

    return useMemo(
        () => ({
            axiosRequest,
            axiosGet,
            axiosPost,
            axiosPut,
            axiosPatch,
            axiosDelete,
            customAxiosRequest,
        }),
        [axiosDelete, axiosGet, axiosPatch, axiosPost, axiosPut, axiosRequest, customAxiosRequest]
    );
};
