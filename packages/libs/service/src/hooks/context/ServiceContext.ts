import type { AxiosInstance } from "axios";
import { createContext } from "react";

export type LoggingInfo = {
    /**
     * The team name of the underlying module (e.g. TelePort)
     */
    teamName: string;
    /**
     * The service name of the underlying module (e.g. LogbookFrontend)
     */
    serviceName: string;
};

export type ServiceContextValue = {
    axiosInstance: AxiosInstance;
    logging?: LoggingInfo;
    baseUrl: string;
};

export const ServiceContext = createContext<ServiceContextValue | undefined>(undefined);
