import type { AxiosResponseHeaders } from "@voloiq/service";
import { useAxiosService } from "@voloiq/service";
import { fileDownload } from "../libs/file-download/fileDownload";

const getFileNameFromHeader = (headers: AxiosResponseHeaders) => {
    const inputString = headers["content-disposition"];
    if (inputString) {
        const filenameRegex = /filename="(.+?)"/;
        const match = inputString.match(filenameRegex);
        if (match) {
            const filename = match[1];
            if (filename) {
                return filename;
            }
        }
    }
    return undefined;
};

export const useSoftwareConfigurationPage = () => {
    const { customAxiosRequest } = useAxiosService();

    const handleDownloadButtonPress = (softwareConfigId: string) => {
        customAxiosRequest<Blob, undefined>({
            path: `/software-configs/${softwareConfigId}/file`,
            method: "GET",
            responseType: "blob",
        }).then((response) => {
            const fileName = getFileNameFromHeader(response.headers);
            fileDownload(response.data, fileName || "fcvar.h");
        });
    };

    return {
        handleDownloadButtonPress,
    };
};
