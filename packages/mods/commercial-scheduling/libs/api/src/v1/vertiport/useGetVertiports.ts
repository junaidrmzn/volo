import { useGetAllService } from "@voloiq/service";
import { VERTIPORT_BASE_URL } from "../../serviceEndpoints";
import { Vertiport } from "./apiModels";

type UseGetVertiportsOptions = {
    manual?: boolean;
};

export const useGetVertiports = (options?: UseGetVertiportsOptions) => {
    return useGetAllService<Vertiport>({
        route: VERTIPORT_BASE_URL,
        params: { page: 1, size: 100 },
        options,
    });
};
