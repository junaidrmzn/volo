import type { ReactNode } from "react";
import type { UseAxiosInstanceProps } from "../axios/useAxiosInstance";
import { useAxiosInstance } from "../axios/useAxiosInstance";
import type { ServiceContextValue } from "./ServiceContext";
import { ServiceContext } from "./ServiceContext";

export type ServiceProviderProps = {
    children: ReactNode;
} & Pick<ServiceContextValue, "baseUrl" | "logging"> &
    Pick<UseAxiosInstanceProps, "requestInterceptors" | "withAuth">;

export const ServiceProvider = (props: ServiceProviderProps) => {
    const { requestInterceptors = [], baseUrl, children, logging, withAuth } = props;
    const { axiosInstance } = useAxiosInstance({ requestInterceptors, withAuth });

    return <ServiceContext.Provider value={{ baseUrl, axiosInstance, logging }}>{children}</ServiceContext.Provider>;
};
