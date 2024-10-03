import {
    Button,
    Flex,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import type { ProcedureRead } from "@voloiq/flight-test-definition-api/v1";
import { useEntitySelection } from "@voloiq/flight-test-definition-utils";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { ProcedureSelectionList } from "./ProcedureSelectionList";
import { usePdfExportModalTranslation } from "./translations/usePdfExportModalTranslation";
import { useOnExport } from "./useOnExport";

export type PdfExportModalProps = {
    isOpen?: boolean;
    onModalClose: () => void;
    procedures: ProcedureRead[];
    generatePdfExport: (procedureIds: string[]) => Promise<void>;
};

export const PdfExportModal = (props: PdfExportModalProps) => {
    const { onModalClose, isOpen = false, procedures, generatePdfExport } = props;
    const { t } = usePdfExportModalTranslation();
    const {
        clearAll,
        entitiesWithSelection: proceduresWithSelection,
        onSelect,
        selectAll,
    } = useEntitySelection({ entities: procedures });

    const { isExporting, onExport } = useOnExport({
        generatePdfExport,
        onExportSuccess: onModalClose,
        procedureIds: proceduresWithSelection
            .filter((procedureWithSelection) => procedureWithSelection.isSelected)
            .map((proceduresWithSelection) => proceduresWithSelection.id),
    });

    return (
        <Modal isOpen={isOpen} onClose={onModalClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("Export to PDF")} modalTitle={t("Definition")} />
                </ModalHeader>
                <ModalBody display="flex" flexDirection="column" gap={6}>
                    <ProcedureSelectionList
                        clearAllProcedures={clearAll}
                        onSelectProcedure={onSelect}
                        proceduresWithSelection={proceduresWithSelection}
                        selectAllProcedures={selectAll}
                    />
                    <Flex width="full" justifyContent="flex-end" gap={3}>
                        <Button variant="secondary" onClick={onModalClose}>
                            {t("Cancel")}
                        </Button>
                        <Button
                            onClick={onExport}
                            leftIcon={<Icon icon="download" />}
                            variant="primary"
                            isLoading={isExporting}
                        >
                            {t("Export")}
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
