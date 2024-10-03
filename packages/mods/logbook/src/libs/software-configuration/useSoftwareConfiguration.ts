import type { SoftwareConfig, SoftwareConfigInsert } from "@voloiq/logbook-api/v6";
import type { AxiosRequestConfig, UseCreateServiceProps } from "@voloiq/service";
import { useCreateService, useDeleteService, useGetAllService, useGetService } from "@voloiq/service";

export const useGetSoftwareConfigurationManual = () => {
    const softwareConfigUrl = "software-configs";

    return useGetService<SoftwareConfig>({ route: softwareConfigUrl, resourceId: "", options: { manual: true } });
};

const createFormData = (softwareConfigurationFileInsert?: SoftwareConfigInsert) => {
    const formData = new FormData();
    if (softwareConfigurationFileInsert) {
        for (const [key, value] of Object.entries(softwareConfigurationFileInsert)) {
            formData.append(key, value);
        }
    }
    return formData;
};

export const useDeleteSoftwareConfiguration = () => {
    const softwareConfigUrl = "software-configs";
    return useDeleteService({ route: softwareConfigUrl });
};

export const useCreateSoftwareConfiguration = (options: Omit<UseCreateServiceProps, "route">) => {
    const softwareConfigUrl = "software-configs";

    const { sendRequest, ...rest } = useCreateService<FormData, SoftwareConfig>({
        route: softwareConfigUrl,
        ...options,
    });

    const customCreate = (config: AxiosRequestConfig<SoftwareConfigInsert>) =>
        sendRequest({
            ...config,
            data: createFormData(config.data),
        });

    return {
        create: customCreate,
        ...rest,
    };
};

export const useGetSoftwareConfigurationsManual = () => {
    const softwareConfigUrl = "/software-configs";

    return useGetAllService<SoftwareConfig>({
        route: softwareConfigUrl,
        options: {
            manual: true,
        },
    });
};
