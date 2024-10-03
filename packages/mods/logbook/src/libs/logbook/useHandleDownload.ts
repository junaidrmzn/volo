import { useToast } from "@volocopter/design-library-react";
import { useCallback } from "react";
import { useGetFileDownloadLink } from "@voloiq/logbook-api/v6";
import { useLogbookTranslation } from "../../log-overview/translations/useLogbookTranslation";

export const useHandleDownload = (resourcePath: "files" | "exports") => {
    const { t, i18n } = useLogbookTranslation();
    const toast = useToast();
    const { getFileDownloadLink } = useGetFileDownloadLink();

    const handleDownloadEvent = useCallback(
        (logId: string, resourceId: string) => {
            getFileDownloadLink(logId, resourceId, resourcePath)
                .then((data) => {
                    const downloadLink = data.data?.url;
                    const element = document.createElement("a");
                    element.setAttribute("href", downloadLink || "");
                    element.setAttribute("download", "download");
                    element.click();
                })
                .catch(() =>
                    toast({
                        title: t("errorManagement.title"),
                        description: t("errorManagement.technicalError"),
                        status: "error",
                    })
                );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [getFileDownloadLink, i18n.language, toast]
    );

    return {
        handleDownloadEvent,
    };
};
