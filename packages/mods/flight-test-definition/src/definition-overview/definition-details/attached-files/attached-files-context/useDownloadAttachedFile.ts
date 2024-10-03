import { useToast } from "@volocopter/design-library-react";
import { useAxiosService } from "@voloiq/service";
import { useDefinition } from "../../definition-context/useDefinition";
import { useAttachedFilesContextTranslation } from "./translations/useAttachedFilesContextTranslation";

export const useDownloadAttachedFile = () => {
    const {
        definition: { id: definitionId },
    } = useDefinition();

    const { customAxiosRequest } = useAxiosService();
    const sendToast = useToast();
    const { t } = useAttachedFilesContextTranslation();

    const downloadAttachedFile = async (options: { attachedFileId: string; fileName: string }) => {
        const { attachedFileId, fileName } = options;
        const downloadUrl = `/ftd/v1/definitions/${definitionId}/files/${attachedFileId}/download`;

        const response = await customAxiosRequest<Blob, undefined>({
            path: downloadUrl,
            method: "get",
            responseType: "blob",
        });

        if (response.status === 200) {
            const { data } = response;
            const href = window.URL.createObjectURL(data);
            const element = document.createElement("a");
            element.setAttribute("href", href);
            element.setAttribute("download", fileName);
            element.click();
        } else {
            sendToast({
                status: "error",
                title: t("Oh Snap!"),
                description: t("Something bad happened. We couldn't download your file"),
            });
        }
    };

    return { downloadAttachedFile };
};

export type DownloadAttachedFile = ReturnType<typeof useDownloadAttachedFile>["downloadAttachedFile"];
