import { ServiceOptions, useGetAllService } from "@voloiq/service";
import type { FlightTestDefinitionResponseBody } from "./apiModels";

export type UseGetAllDefinitionsOptions = {
    serviceOptions?: Partial<ServiceOptions>;
};

export const useGetAllDefinitions = (options: UseGetAllDefinitionsOptions) => {
    const { serviceOptions } = options;
    const { options: customOptions, config: customConfig } = serviceOptions ?? {};
    const { filter, ...customParams } = serviceOptions?.params ?? {};

    return useGetAllService<FlightTestDefinitionResponseBody>({
        route: "/ftd/v2/definitions-all",
        options: {
            manual: true,
            ...customOptions,
        },
        params: {
            size: 100,
            orderBy: "title:asc",
            ...customParams,
            // If the filter is sent to the API as an empty string, it triggers an error.
            ...(filter ? { filter } : {}),
        },
        config: customConfig,
    });
};
