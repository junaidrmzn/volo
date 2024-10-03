import { Icon, IconButton, useToast } from "@volocopter/design-library-react";
import { useFlightTestOrderDetailsTranslation } from "./translations/useFlightTestOrderDetailsTranslation";
import { useGenerateFtoPdf } from "./useGenerateFtoPdf";

export type FlightTestOrderButtonProps = {
    orderId: string;
    ftoId: string;
    title: string;
};

export const ExportFlightTestOrderButton = (props: FlightTestOrderButtonProps) => {
    const { orderId, ftoId, title } = props;
    const sendToast = useToast();

    const { t } = useFlightTestOrderDetailsTranslation();
    const { generateFtoPdfExport } = useGenerateFtoPdf();

    const handleExportPdf = async () => {
        try {
            await generateFtoPdfExport({
                orderId,
                fileName: `${ftoId}.${title}.pdf`,
            });
        } catch {
            sendToast({
                status: "error",
                title: t("Oh Snap!"),
                description: t("Something bad happened. We couldn't generate your export."),
            });
        }
    };

    return (
        <IconButton
            aria-label={t("Export")}
            onClick={handleExportPdf}
            icon={<Icon size={4} icon="download" />}
            variant="secondary"
        />
    );
};
