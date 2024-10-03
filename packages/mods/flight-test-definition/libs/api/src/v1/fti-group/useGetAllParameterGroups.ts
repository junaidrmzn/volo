import { UseGetAllServiceProps, useGetAllService } from "@voloiq/service";
import type { ParameterGroup } from "./apiModels";

export type UseGetAllParameterGroupsOptions = Pick<UseGetAllServiceProps, "options" | "config">;

export const useGetAllParameterGroups = (options?: UseGetAllParameterGroupsOptions) => {
    const { data: parameterGroups, sendRequestWithResponseEnvelope: getAllParameterGroupsWithResponseEnvelope } =
        useGetAllService<ParameterGroup>({ route: "/ftd/v1/parameter-groups", ...options });

    return {
        parameterGroups,
        getAllParameterGroupsWithResponseEnvelope,
    };
};
