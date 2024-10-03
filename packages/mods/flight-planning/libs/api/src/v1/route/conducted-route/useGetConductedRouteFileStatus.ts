import { useGetService } from "@voloiq/service";
import type { FileStatus } from "./models";

type UseGetConductedRouteFileStatusOptions = {
    routeId: string | number;
    manual: boolean;
};

export const useGetConductedRouteFileStatus = (options: UseGetConductedRouteFileStatusOptions) => {
    const { routeId, manual } = options;

    return useGetService<FileStatus>({
        route: `/routes/${routeId}/conducted-route/file/status`,
        resourceId: "",
        options: { manual },
    });
};
