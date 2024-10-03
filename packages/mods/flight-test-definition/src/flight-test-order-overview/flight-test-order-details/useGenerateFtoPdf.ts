import { useAxiosService } from "@voloiq/service";
import { useFlightTestOrderDetailsTranslation } from "./translations/useFlightTestOrderDetailsTranslation";

export type GenerateFtoPdfExportOptions = {
    orderId: string;
    fileName: string;
};
export const useGenerateFtoPdf = () => {
    const { customAxiosRequest } = useAxiosService();
    const { t } = useFlightTestOrderDetailsTranslation();

    const generateFtoPdfExport = async (options: GenerateFtoPdfExportOptions) => {
        const { orderId, fileName } = options;
        const downloadUrl = `/ftd/v1/orders/${orderId}/pdf`;

        const response = await customAxiosRequest<Blob, {}>({
            path: downloadUrl,
            method: "post",
            responseEncoding: "binary",
            responseType: "blob",
            data: {},
        });
        if (response.status === 200) {
            const { data } = response;
            const blob = new Blob([data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.setAttribute("href", url);
            element.setAttribute("download", fileName);
            element.click();
        } else throw new Error(t("Something bad happened. We couldn't generate your export."));
    };

    return { generateFtoPdfExport };
};
