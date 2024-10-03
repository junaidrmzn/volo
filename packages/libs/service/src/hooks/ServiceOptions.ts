import type { AxiosRequestConfig } from "axios";
import type { Options } from "axios-hooks";

export type ServiceOptions = {
    route: string;
    params?: ServiceParameters;
    config?: AxiosRequestConfig;
    options?: Options;
};

export type ResourceServiceOptions = {
    resourceId: string;
};

export type ServiceParameters = {
    [key: string]: string | number | boolean | string[];
};
