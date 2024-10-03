import type { CSVImportResponse, CreateParametersFromCsvFileBody } from "@voloiq-typescript-api/fti-types";
import { useCreateService, useGetAllService, useGetService, usePatchService } from "@voloiq/service";
import type { AxiosRequestConfig, UseCreateServiceProps } from "@voloiq/service";
import type { Parameter, ParameterInsert, ParameterPatch } from "./apiModels";
import { useGetRoute } from "./useGetRoute";

const baseRoute = "parameters";

export const usePostParameters = () => {
    const { route } = useGetRoute({ baseRoute });
    return useCreateService<ParameterInsert[], Parameter[]>({
        route,
        config: { baseURL: `${BACKEND_BASE_URL}/ftd/v2` },
    });
};

export const usePatchParameter = (resourceId: string) => {
    const { route } = useGetRoute({ baseRoute });
    return usePatchService<ParameterPatch, Parameter>({
        route,
        resourceId,
        config: { baseURL: `${BACKEND_BASE_URL}/ftd/v2` },
    });
};

export const useGetParameters = () => {
    const { route } = useGetRoute({ baseRoute });
    return useGetAllService<Parameter>({
        route,
        config: { baseURL: `${BACKEND_BASE_URL}/ftd/v2` },
        options: {
            manual: true,
        },
    });
};

export const useGetParameter = () => {
    const { route } = useGetRoute({ baseRoute });
    return useGetService<Parameter>({
        route,
        config: { baseURL: `${BACKEND_BASE_URL}/ftd/v2` },
        resourceId: "",
        options: { manual: true },
    });
};

export const useImportParameters = (options: Omit<UseCreateServiceProps, "route">) => {
    const { route } = useGetRoute({ baseRoute });
    const { sendRequest, ...rest } = useCreateService<FormData, CSVImportResponse>({
        route: `${route}/csv-upload`,
        ...options,
    });

    const createFormData = (data: CreateParametersFromCsvFileBody) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        return formData;
    };

    const customCreate = (config: AxiosRequestConfig<Blob>) => {
        return sendRequest({
            ...config,
            data: createFormData({ csvFile: config.data! }),
        });
    };

    return {
        create: customCreate,
        ...rest,
    };
};
