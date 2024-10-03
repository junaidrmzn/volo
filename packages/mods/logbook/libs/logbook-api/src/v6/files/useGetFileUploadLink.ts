import { paramsSerializer, useService } from "@voloiq/service";
import type { AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import type { ExportFileUrl, FileType } from "./apiModels";

export const useGetFileUploadLink = () => {
    const { axiosInstance, baseUrl } = useService();
    return {
        getFileUploadLink: (logId: string, fileType: FileType, fileName: string) => {
            return axiosInstance.request<never, AxiosResponse<ResponseEnvelope<ExportFileUrl>>>({
                url: `/logs/${logId}/upload-link`,
                withCredentials: true,
                paramsSerializer,
                params: {
                    fileType,
                    fileName,
                },
                baseURL: baseUrl,
            });
        },
    };
};
