import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@volocopter/design-library-react";
import type { Error, ErrorDetail } from "@voloiq/service";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type EditAircraftTypeConfirmationProps = {
    isOpen: boolean;
    informationToConfirm?: Error;
    onClose: Function;
    onUpdateConfirmation?: Function;
};

export const EditAircraftTypeConfirmation = (props: EditAircraftTypeConfirmationProps) => {
    const { isOpen, onClose, informationToConfirm, onUpdateConfirmation = () => {} } = props;

    const { t } = useResourcesTranslation();
    const confirmationMessage =
        informationToConfirm?.details
            ?.map((errorDetail: ErrorDetail) => {
                return errorDetail.message ?? "";
            })
            .join("\n") ?? informationToConfirm?.message;

    const onConfirmEdit = () => {
        onUpdateConfirmation?.();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={() => onClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> {t("aircraft-type.edit.confirm heading")} </ModalHeader>
                <ModalBody>
                    <VStack align="flex-start">
                        <Box>{informationToConfirm?.message}</Box>
                        <Box>{confirmationMessage}</Box>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => onConfirmEdit()} variant="secondary">
                        {t("generic.confirm button")}
                    </Button>
                    <Button onClick={() => onClose()} variant="primary">
                        {t("generic.cancel button")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
