import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { WindchillRequirementsModalContent } from "./WindchillRequirementsModalContent";
import { useWindchillRequirementsModalTranslation } from "./translations/useWindchillRequirementsModalTranslation";
import { useWindchillAssociatedRequirements } from "./useWindchillAssociatedRequirements";

type WindchillRequirementsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    definitionId: string;
};

export const WindchillRequirementsModal = (props: WindchillRequirementsModalProps) => {
    const { definitionId, isOpen, onClose } = props;

    const { t } = useWindchillRequirementsModalTranslation();
    const { windchillAssociatedRequirementsCount } = useWindchillAssociatedRequirements({ definitionId });

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={t("Edit")}
                        modalTitle={`${t("Requirements From Windchill")} (${windchillAssociatedRequirementsCount})`}
                    />
                </ModalHeader>
                <ModalBody>
                    <WindchillRequirementsModalContent onAfterSubmit={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
