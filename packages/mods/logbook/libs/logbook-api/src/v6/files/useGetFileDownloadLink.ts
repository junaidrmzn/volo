import { useAxiosService } from "@voloiq/service";
import type { ExportFileUrl, FileUrl } from "./apiModels";

export const useGetFileDownloadLink = () => {
    const { axiosPost } = useAxiosService();

    return {
        getFileDownloadLink: (logId: string, resourceId: string, resourcePath: string) =>
            axiosPost<ExportFileUrl | FileUrl, never>({
                path: `/logs/${logId}/${resourcePath}/${resourceId}/download-link`,
            }),
    };
};
