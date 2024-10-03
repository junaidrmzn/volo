import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { SafetyReviewBoardModalContent } from "./SafetyReviewBoardModalContent";
import { useSafetyReviewBoardSectionModalTranslation } from "./translations/useSafetyReviewBoardSectionModalTranslation";

type SafetyReviewBoardModalProps = {
    isOpen: boolean;
    onClose: () => void;
    testHazardAssessments: TestHazardAssessment[];
};

export const SafetyReviewBoardModal = (props: SafetyReviewBoardModalProps) => {
    const { isOpen, onClose, testHazardAssessments } = props;

    const { t } = useSafetyReviewBoardSectionModalTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("Edit")} modalTitle={`${t("Test Hazards")}`} />
                </ModalHeader>
                <ModalBody>
                    <SafetyReviewBoardModalContent testHazardAssessments={testHazardAssessments} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
