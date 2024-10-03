import type { ServiceParameters } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import type { Parameter } from "./apiModels";

export type UseGetAllFtiParametersOptions = {
    params?: ServiceParameters;
};

export const useGetAllFtiParameters = (options: UseGetAllFtiParametersOptions = {}) => {
    const { params } = options;

    const { sendRequest: getAllFtiParameters } = useGetAllService<Parameter>({
        route: "/ftd/v2/instrumentation-parameters",
        options: {
            manual: true,
        },
        params,
    });

    return { getAllFtiParameters };
};
