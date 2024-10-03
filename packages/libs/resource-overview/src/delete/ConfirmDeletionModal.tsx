import {
    Button,
    Center,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceDeleteTranslations } from "./translations/useResourceDeleteTranslations";

export const ConfirmDeletionModal = () => {
    const [state, send] = useGlobalState();
    const {
        meta: {
            delete: { getDeleteTexts },
        },
        context: { selectedResource },
    } = state;
    const { t } = useResourceDeleteTranslations();
    const {
        confirmationModal: { headerText, bodyText, deleteButtonText = t("Delete"), cancelButtonText = t("Cancel") },
    } = getDeleteTexts(selectedResource);
    const cancelDeletion = () => send("CANCEL_DELETION");
    return (
        <Modal isOpen={state.matches({ delete: "confirming" })} onClose={cancelDeletion} variant="prompt">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{headerText}</ModalHeader>
                <ModalBody>{bodyText}</ModalBody>
                <ModalFooter>
                    <Center>
                        <HStack>
                            <Button onClick={cancelDeletion} variant="primary">
                                {cancelButtonText}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() =>
                                    send({
                                        type: "CONFIRM_DELETION",
                                        selectedResourceId: state.context.selectedResourceId,
                                    })
                                }
                            >
                                {deleteButtonText}
                            </Button>
                        </HStack>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
