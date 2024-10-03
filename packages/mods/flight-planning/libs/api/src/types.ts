import { AxiosRequestConfig } from "@voloiq/service";

export type MutationContext<Resource extends {}> = { resource?: Resource };
export type ResourceRequest<Resource extends {}> = AxiosRequestConfig<Resource> | undefined;
export type ResourceResponse<Resource extends {}> = Resource | undefined;
