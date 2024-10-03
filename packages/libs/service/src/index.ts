export { useCreateService } from "./hooks/useCreateService";
export type { UseCreateServiceProps } from "./hooks/useCreateService";

export { useDeleteService } from "./hooks/useDeleteService";
export type { UseDeleteServiceProps } from "./hooks/useDeleteService";

export { useGetService } from "./hooks/useGetService";
export type { UseGetServiceProps } from "./hooks/useGetService";

export { useGetParamsService } from "./hooks/useGetParamsService";
export type { UseGetParamsServiceProps } from "./hooks/useGetParamsService";

export { useGetAllService } from "./hooks/useGetAllService";
export type { UseGetAllServiceProps } from "./hooks/useGetAllService";

export { useUpdateService } from "./hooks/useUpdateService";
export type { UseUpdateServiceOptions } from "./hooks/useUpdateService";

export { usePatchService } from "./hooks/usePatchService";
export type { UsePatchServiceOptions } from "./hooks/usePatchService";

export { useService } from "./hooks/context/useService";

export type { ServiceState } from "./hooks/useServiceState";
export { ServiceProvider } from "./hooks/context/ServiceProvider";

export type { AxiosPromise, AxiosError, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";
export * as axios from "axios";
export type { Error } from "./error/error";
export { isError } from "./error/error";
export type { ErrorDetail } from "./error/errorDetail";
export type {
    OffsetBasedPagination,
    SizeBasedPagination,
    Pagination,
    ResponseEnvelope,
} from "./hooks/types/ResponseEnvelope";

export { isSizeBasedPagination, isOffsetBasedPagination } from "./hooks/types/ResponseEnvelope";

export type { ServiceParameters, ServiceOptions } from "./hooks/ServiceOptions";

export { paramsSerializer } from "./utils/useParamsSerializer";

export { serializeFilters } from "./utils/serializeFilters";

export { mergeSerializedFiltersWithQuickFilter } from "./utils/mergeSerializedFiltersWithQuickFilter";

export { useLoggingInterceptor } from "./hooks/axios/useLoggingInterceptor";
export { useAuthenticationInterceptor } from "./hooks/axios/useAuthenticationInterceptor";

// eslint-disable-next-line deprecation/deprecation
export { axiosInstance } from "./hooks/axios/useAxiosInstance";

export type { AxiosServiceRequestConfig } from "./hooks/useAxiosService";
export { useAxiosService } from "./hooks/useAxiosService";
