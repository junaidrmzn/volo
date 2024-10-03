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
import type { TestPoint } from "@voloiq/flight-test-definition-api/v2";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { TestPointAttemptTableV2 } from "./TestPointAttemptTableV2";
import { useTestPointAttemptModalV2Translation } from "./translations/useTestPointAttemptModalV2Translation";
import { useAttemptsV2 } from "./useAttemptsV2";

export type EditTestPointAttemptModalV2Props = {
    testPoint: TestPoint;
    procedureTitle: string;
    isOpen?: boolean;
    onClose: () => void;
};

export const EditTestPointAttemptModalV2 = (props: EditTestPointAttemptModalV2Props) => {
    const { testPoint, isOpen = false, procedureTitle, onClose } = props;
    const { attempts: initialAttempts, testPointId: testPointName, id } = testPoint;
    const { attempts, isLoading, attemptIdInEdit, onUpdateTestpointAttempt, setAttemptIdInEdit } = useAttemptsV2(
        initialAttempts,
        id
    );
    const { t } = useTestPointAttemptModalV2Translation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
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
                            <TestPointAttemptTableV2
                                testPointAttempts={attempts}
                                py={2}
                                onTestpointAttemptChange={onUpdateTestpointAttempt}
                                onEditStatus={setAttemptIdInEdit}
                                statusInEditMode={attemptIdInEdit}
                                onClose={() => setAttemptIdInEdit(undefined)}
                                isLoading={isLoading}
                            />
                        </VStack>
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
