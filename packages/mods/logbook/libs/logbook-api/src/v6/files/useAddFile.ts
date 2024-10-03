import { AxiosResponse, ResponseEnvelope, paramsSerializer, useService } from "@voloiq/service";
import type { FileInsert, LogbookFile } from "./apiModels";

export const useAddFile = () => {
    const { axiosInstance, baseUrl } = useService();

    return {
        addFile: (logId: string, fileInsert: FileInsert) => {
            return axiosInstance.request<never, AxiosResponse<ResponseEnvelope<LogbookFile>>>({
                method: "POST",
                url: `/logs/${logId}/files`,
                data: fileInsert,
                paramsSerializer,
                withCredentials: true,
                baseURL: baseUrl,
            });
        },
    };
};
