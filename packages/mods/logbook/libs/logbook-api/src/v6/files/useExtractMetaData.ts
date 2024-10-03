import { paramsSerializer, useService } from "@voloiq/service";
import type { AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import type { FileEntry, LogFileSnippet, Metadata } from "./apiModels";

const createFormData = <T>(file?: T) => {
    const formData = new FormData();
    if (file) {
        for (const [key, value] of Object.entries(file)) {
            formData.append(key, value);
        }
    }
    return formData;
};

export const useExtractMetadata = () => {
    const { axiosInstance, baseUrl } = useService();

    return {
        extractMetadata: (productLine: string, fileEntry: FileEntry) => {
            const fileSnippet: LogFileSnippet = {
                logFile: fileEntry.file.slice(0, 4_000_000),
            };

            return axiosInstance.request<never, AxiosResponse<ResponseEnvelope<Metadata>>>({
                method: "POST",
                url: `/extract-metadata`,
                data: createFormData<LogFileSnippet>(fileSnippet),
                paramsSerializer,
                withCredentials: true,
                baseURL: baseUrl,

                params: {
                    productLine,
                    fileType: fileEntry.type,
                },
            });
        },
    };
};
