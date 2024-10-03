import { useGetAllService } from "@voloiq/service";
import type { TestPointParameter } from "./apiModels";

export type UseGetAllTestPointParametersOptions = {
    manual?: boolean;
    params?: {
        size?: number;
        orderBy?: string;
    };
};

export const useGetAllTestPointParameters = (options: UseGetAllTestPointParametersOptions = {}) => {
    const { manual = true, params } = options;
    return useGetAllService<TestPointParameter>({
        route: "/ftd/v2/test-point-parameters",
        options: {
            manual,
        },
        params: {
            size: params?.size && params.size > 0 ? params.size : 100,
            orderBy: params?.orderBy || "name:asc",
        },
    });
};
