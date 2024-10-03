import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { useGetAllProcedures } from "@voloiq/flight-test-definition-api/v1";
import { PdfExportModal } from "./pdf-export-modal/PdfExportModal";
import { usePdfExportTranslation } from "./translations/usePdfExportTranslation";
import { useGeneratePdfExport } from "./useGeneratePdfExport";

export type PdfExportButtonProps = {
    definitionId: string;
    ftdId: string;
    title: string;
    revision: string;
};

export const PdfExportButton = (props: PdfExportButtonProps) => {
    const { definitionId, ftdId, title, revision } = props;
    const { t } = usePdfExportTranslation();
    const { generatePdfExport } = useGeneratePdfExport();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { data: procedures, state, getAllProcedures } = useGetAllProcedures({ definitionId });

    return (
        <>
            <Button
                leftIcon={<Icon size={4} icon="download" />}
                variant="secondary"
                size="sm"
                isLoading={state === "pending"}
                onClick={() => {
                    getAllProcedures().then(onOpen);
                }}
            >
                {t("Export")}
            </Button>
            <PdfExportModal
                generatePdfExport={(procedureIds) =>
                    generatePdfExport({
                        definitionId,
                        fileName: `${ftdId}.${title}.pdf`,
                        procedureIds,
                        revision,
                    })
                }
                onModalClose={onClose}
                isOpen={isOpen}
                procedures={procedures}
            />
        </>
    );
};
