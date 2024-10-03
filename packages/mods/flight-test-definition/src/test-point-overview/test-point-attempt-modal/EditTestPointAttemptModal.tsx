import {
    Button,
    Divider,
    HStack,
    Heading,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    VStack,
} from "@volocopter/design-library-react";
import type { TestPoint } from "@voloiq/flight-test-definition-api/v1";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { TestPointAttemptModalTable } from "./TestPointAttemptTable";
import { TestPointAttemptModalForm } from "./test-point-attempt-modal-form/TestPointAttemptModalForm";
import { useTestPointAttemptModalTranslation } from "./translations/useTestPointAttemptModalTranslation";
import { useAttempts } from "./useAttempts";

export type EditTestPointAttemptModalProps = {
    testPoint: TestPoint;
    procedureTitle: string;
    isOpen?: boolean;
    onClose: () => void;
};

export const EditTestPointAttemptModal = (props: EditTestPointAttemptModalProps) => {
    const { testPoint, isOpen = false, procedureTitle, onClose } = props;
    const { attempts: initialAttempts, testPointId: testPointName, id } = testPoint;

    const {
        attempts,
        isLoading,
        attemptIdInEdit,
        setAttemptIdInEdit,
        onAddTestpointAttempt,
        onUpdateTestpointAttempt,
    } = useAttempts(initialAttempts, id);

    const { t } = useTestPointAttemptModalTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton isDisabled={isLoading} />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={t("modal.modalType")}
                        modalTitle={t("modal.{testPointId}: {procedureTitle}", {
                            testPointId: testPointName,
                            procedureTitle,
                        })}
                    />
                </ModalHeader>
                <ModalBody>
                    <Stack spacing="3">
                        <Heading fontSize="md" fontWeight="bold">
                            {t("modal.Test point {testPointName}", { testPointName })}
                        </Heading>
                        <VStack spacing="0" bg="gray.200" borderRadius="sm" divider={<Divider />}>
                            <TestPointAttemptModalTable
                                testPointAttempts={attempts}
                                py={2}
                                onTestpointAttemptChange={onUpdateTestpointAttempt}
                                onEditStatus={setAttemptIdInEdit}
                                statusInEditMode={attemptIdInEdit}
                                onClose={() => setAttemptIdInEdit(undefined)}
                                isLoading={isLoading}
                            />
                            {attemptIdInEdit === "new" && (
                                <TestPointAttemptModalForm
                                    onSubmit={onAddTestpointAttempt}
                                    submitButtonIsLoading={isLoading}
                                    onClose={() => {
                                        setAttemptIdInEdit(undefined);
                                    }}
                                />
                            )}
                        </VStack>

                        {attemptIdInEdit !== "new" && (
                            <Button
                                variant="secondary"
                                leftIcon={<Icon icon="add" />}
                                size="md"
                                width="full"
                                onClick={() => setAttemptIdInEdit("new")}
                            >
                                {t("modal.Link new FTO")}
                            </Button>
                        )}
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <HStack justify="flex-end">
                        <Button
                            leftIcon={<Icon icon="check" />}
                            variant="primary"
                            size="lg"
                            isDisabled={isLoading}
                            onClick={onClose}
                        >
                            {t("modal.Done")}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
