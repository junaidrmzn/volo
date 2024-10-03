import type { ParameterSource } from "@voloiq-typescript-api/fti-types";
import { useGetAllService } from "@voloiq/service";
import { useGetRoute } from "./useGetRoute";

const baseRoute = "parameter-sources";

export const useGetAllParameterSources = () => {
    const { route } = useGetRoute({ baseRoute });
    return useGetAllService<ParameterSource>({
        route,
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
};

export const useGetAllParameterSourcesManual = () => {
    const { route } = useGetRoute({ baseRoute });

    return useGetAllService<ParameterSource>({
        route,
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
};
