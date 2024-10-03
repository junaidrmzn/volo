import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { ManualRequirementsModalContent } from "./ManualRequirementsModalContent";
import { useManualRequirementsModalTranslation } from "./translations/useManualRequirementsModalTranslation";
import { useManualRequirements } from "./useManualRequirements";

type ManualRequirementsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    definitionId: string;
};

export const ManualRequirementsModal = (props: ManualRequirementsModalProps) => {
    const { definitionId, isOpen, onClose } = props;

    const { t } = useManualRequirementsModalTranslation();
    const { manualRequirementsCount } = useManualRequirements({ definitionId });

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={manualRequirementsCount > 0 ? t("Edit") : t("Add")}
                        modalTitle={`${t("Manual Requirements")} (${manualRequirementsCount})`}
                    />
                </ModalHeader>
                <ModalBody>
                    <ManualRequirementsModalContent onAfterSubmit={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
