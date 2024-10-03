import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@volocopter/design-library-react";
import type { TestPoint } from "@voloiq/flight-test-definition-api/v1";
import { DoneButton } from "@voloiq/flight-test-definition-components";
import { PromiseResults } from "@voloiq/form";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { TestPointParametersSelector } from "./TestPointParametersSelector";
import { TestPointsForm } from "./TestPointsForm";
import { useTestPointSectionTranslation } from "./translations/useTestPointSectionTranslation";
import { useTestPointParametersSelection } from "./useTestPointParametersSelection";
import { useTestPointsFormRef } from "./useTestPointsFormRef";
import { useUpdateTestPointParameters } from "./useUpdateTestPointParameters";

export type TestPointsFormModalProps = {
    isOpen?: boolean;
    onModalClose: () => void;
    testPoints: TestPoint[];
    definitionId: string;
    procedureId: string;
};

export const TestPointsFormModal = (props: TestPointsFormModalProps) => {
    const { isOpen = true, testPoints, onModalClose, definitionId, procedureId } = props;

    const { t } = useTestPointSectionTranslation();
    const sendToast = useToast();
    const { selectTestPointParameters, selectedTestPointParameters } = useTestPointParametersSelection({
        definitionId,
        procedureId,
    });
    const { updateTestPointParameters } = useUpdateTestPointParameters({
        definitionId,
        procedureId,
        testPointParameters: selectedTestPointParameters,
    });
    const { formRef, triggerFormSubmit } = useTestPointsFormRef();

    const handleOnAfterSubmit = (results?: PromiseResults | undefined) => {
        const hasErrors = results?.some((result) => result.status === "rejected");

        if (hasErrors) {
            sendToast({
                status: "error",
                title: t("Uh-oh!"),
                description: t("Something went wrong while updating the test points"),
            });
        }

        // Only close the modal if all the BulkForm operations were successful
        // and also if test point parameters were updated without errors.
        updateTestPointParameters().then(() => {
            if (!hasErrors) {
                onModalClose();
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onModalClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={testPoints && testPoints.length > 0 ? t("Edit") : t("Add")}
                        modalTitle={t("Test Points")}
                    />
                </ModalHeader>
                <ModalBody display="flex" flexDirection="column" gap={6}>
                    <TestPointParametersSelector
                        onSelectTestPointParameters={selectTestPointParameters}
                        selectedTestPointParameters={selectedTestPointParameters}
                    />
                    <TestPointsForm
                        formRef={formRef}
                        definitionId={definitionId}
                        procedureId={procedureId}
                        testPoints={testPoints}
                        onAfterSubmit={handleOnAfterSubmit}
                        testPointParameters={selectedTestPointParameters}
                    />
                    <Flex width="full" justifyContent="flex-end">
                        <DoneButton onClick={triggerFormSubmit} />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
