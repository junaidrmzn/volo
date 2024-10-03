import { Button, Icon } from "@volocopter/design-library-react";
import { usePdfExportTranslation } from "./translations/usePdfExportTranslation";
import { useGeneratePdfExport } from "./useGeneratePdfExport";

export type PdfExportButtonWithoutModalProps = {
    definitionId: string;
    ftdId: string;
    title: string;
    revision: string;
};

export const PdfExportButtonWithoutModal = (props: PdfExportButtonWithoutModalProps) => {
    const { definitionId, ftdId, title, revision } = props;
    const { t } = usePdfExportTranslation();
    const { generatePdfExport } = useGeneratePdfExport();

    return (
        <Button
            leftIcon={<Icon size={4} icon="download" />}
            variant="secondary"
            size="sm"
            onClick={() =>
                generatePdfExport({
                    definitionId,
                    fileName: `${ftdId}.${title}.pdf`,
                    revision,
                })
            }
        >
            {t("Export")}
        </Button>
    );
};
