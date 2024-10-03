import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { useAuthenticationInterceptor } from "./useAuthenticationInterceptor";
import { useLoggingInterceptor } from "./useLoggingInterceptor";

export type UseAxiosInstanceProps = {
    requestInterceptors?: ((request: AxiosRequestConfig) => AxiosRequestConfig)[];
    withAuth?: boolean;
};

/**
 * @deprecated This axios instance is missing authentication (JWT management) and logging support (conforming to the api standards).
 * Use the preconfigured axios instance from the ServiceProvider context instead with the useService hook.
 */
export const axiosInstance = axios.create();

export const useAxiosInstance = (props: UseAxiosInstanceProps) => {
    const { requestInterceptors = [], withAuth = false } = props;
    const [axiosInstance] = useState<AxiosInstance>(axios.create);
    const { authenticationInterceptor } = useAuthenticationInterceptor();
    const { loggingInterceptor } = useLoggingInterceptor();

    // Adding interceptors should be synchronous so that it is done before children of the consumer
    // http requests are made with the axios instance
    useLayoutEffect(() => {
        const interceptorIds = [
            // First interceptors are executed last: https://github.com/axios/axios/issues/1663
            ...requestInterceptors.map((interceptor) => axiosInstance.interceptors.request.use(interceptor)),
        ];

        interceptorIds.push(axiosInstance.interceptors.request.use(loggingInterceptor));

        if (withAuth) {
            interceptorIds.push(axiosInstance.interceptors.request.use(authenticationInterceptor));
        }

        return () => {
            for (const interceptorId of interceptorIds) {
                axiosInstance.interceptors.request.eject(interceptorId);
            }
        };
    }, [
        authenticationInterceptor,
        axiosInstance.interceptors.request,
        loggingInterceptor,
        requestInterceptors,
        withAuth,
    ]);

    return { axiosInstance };
};
