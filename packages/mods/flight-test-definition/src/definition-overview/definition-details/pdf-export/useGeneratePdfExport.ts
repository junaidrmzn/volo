import { useToast } from "@volocopter/design-library-react";
import { useAxiosService } from "@voloiq/service";
import { usePdfExportTranslation } from "./translations/usePdfExportTranslation";

export type GeneratePdfExportOptions = {
    definitionId: string;
    fileName: string;
    procedureIds?: string[];
    revision: string;
};
export const useGeneratePdfExport = () => {
    const { customAxiosRequest } = useAxiosService();
    const { t } = usePdfExportTranslation();
    const sendToast = useToast();

    const generatePdfExport = async (options: GeneratePdfExportOptions) => {
        const { definitionId, fileName, procedureIds, revision } = options;
        const downloadUrl = `/ftd/v1/definitions/${definitionId}/revisions/${revision}/pdf`;

        const response = await customAxiosRequest<Blob, { procedureIds: string[] }>({
            path: downloadUrl,
            method: "post",
            responseEncoding: "binary",
            responseType: "blob",
            ...(procedureIds && { data: { procedureIds } }),
        });

        if (response.status === 200) {
            const { data } = response;
            const blob = new Blob([data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.setAttribute("href", url);
            element.setAttribute("download", fileName);
            element.click();
        } else {
            sendToast({
                status: "error",
                title: t("Oh Snap!"),
                description: t("Something bad happened. We couldn't generate your export."),
            });
        }
    };

    return { generatePdfExport };
};
