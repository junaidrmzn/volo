import { Button, HStack, Modal, ModalContent, ModalFooter, ModalOverlay, Text } from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../translations";

type FormModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    heading: string;
    formId: string;
};
export const FormModal: FCC<FormModalProps> = (props) => {
    const { isOpen, handleClose, heading, formId, children } = props;
    const { t: translate } = useFlightPlanningTranslation();

    return (
        <Modal size="sm" onClose={handleClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent padding="24px">
                <Text data-testid="form-modal-heading">{heading}</Text>
                {children}
                <ModalFooter>
                    <HStack justifyContent="end">
                        <Button onClick={handleClose} data-testid="form-modal-cancel-button">
                            {translate("common.cancel")}
                        </Button>
                        <Button type="submit" form={formId} data-testid="form-modal-set-button">
                            {translate("common.set")}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
