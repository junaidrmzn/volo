import { useGetService } from "@voloiq/service";
import { FileUrl } from "../models";

type UseGetKmlFileUploadLinkOptions = {
    routeOptionId: string | number;
    manual: boolean;
};
export const useGetKmlFileUploadLink = (options: UseGetKmlFileUploadLinkOptions) => {
    const { routeOptionId, manual } = options;

    return useGetService<FileUrl>({
        route: `/route-options/${routeOptionId}/kml/upload-link`,
        resourceId: "",
        options: { manual },
    });
};
