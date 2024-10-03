import { useGetService } from "@voloiq/service";
import { FileUrl } from "../../models";

type UseGetConductedRouteFileUploadLinkOptions = {
    routeId: string | number;
    manual: boolean;
};

export const useGetConductedRouteFileUploadLink = (options: UseGetConductedRouteFileUploadLinkOptions) => {
    const { routeId, manual } = options;

    return useGetService<FileUrl>({
        route: `/routes/${routeId}/conducted-route/upload-link`,
        resourceId: "",
        options: { manual },
    });
};
