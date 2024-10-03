import { useGetService } from "@voloiq/service";
import type { ServiceOptions } from "@voloiq/service";
import type { SoftwareConfig } from "./apiModels";

export type UseGetSoftwareConfigurationOptions = {
    softwareConfigurationId?: string;
    serviceOptionsOverride?: Partial<Pick<ServiceOptions, "options" | "params">>;
};

export const useGetSoftwareConfiguration = (options?: UseGetSoftwareConfigurationOptions) => {
    const { softwareConfigurationId, serviceOptionsOverride } = options || {};
    const {
        data: softwareConfiguration,
        refetchDataWithResponseEnvelope: getSoftwareConfiguration,
        error,
        state,
    } = useGetService<SoftwareConfig>({
        route: "software-configs",
        resourceId: softwareConfigurationId ?? "",
        params: serviceOptionsOverride?.params,
        options: serviceOptionsOverride?.options,
    });
    return {
        softwareConfiguration,
        getSoftwareConfiguration,
        error,
        state,
    };
};
