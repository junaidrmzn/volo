import { useAxiosService } from "@voloiq/service";
import type { ParameterGroup, ParameterGroupInsert } from "./apiModels";

export const useCreateParameterGroup = () => {
    const { axiosPost } = useAxiosService();

    const createParameterGroup = (data: ParameterGroupInsert) => {
        return axiosPost<ParameterGroup, ParameterGroupInsert>({ path: "/ftd/v1/parameter-groups", data });
    };

    return { createParameterGroup };
};
