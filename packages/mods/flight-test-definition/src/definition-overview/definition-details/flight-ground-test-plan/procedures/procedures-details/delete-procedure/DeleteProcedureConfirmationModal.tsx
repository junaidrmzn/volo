import {
    Button,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { useBulkDeleteProcedures } from "@voloiq/flight-test-definition-api/v2";
import { useNavigate } from "@voloiq/routing";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { useDeleteProcedureTranslation } from "./translations/useDeleteProcedureTranslation";

export type DeleteProcedureConfirmationModalProps = {
    definitionId: string;
    procedureId: string;
    isOpen?: boolean;
    onClose: () => void;
};

export const DeleteProcedureConfirmationModal = (props: DeleteProcedureConfirmationModalProps) => {
    const { definitionId, procedureId, isOpen = false, onClose } = props;

    const { t } = useDeleteProcedureTranslation();
    const { bulkDeleteProcedures } = useBulkDeleteProcedures({ definitionId });
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();
    const navigate = useNavigate();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalTitle={t("Procedure")} modalType={t("Delete")} />
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={6}>
                        <Text fontSize="sm" lineHeight={6}>
                            {t("Are you sure you want to permanently delete this procedure?")}
                        </Text>
                        <HStack>
                            <Button variant="primary" onClick={onClose}>
                                {t("Cancel")}
                            </Button>
                            <Button
                                leftIcon={<Icon size={4} icon="delete" />}
                                variant="secondary"
                                onClick={async () => {
                                    await bulkDeleteProcedures({ data: [procedureId], params: { editSessionId } });
                                    navigate("./../..");
                                }}
                            >
                                {t("Delete")}
                            </Button>
                        </HStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
