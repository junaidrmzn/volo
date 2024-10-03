import {
    Box,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { LoadingSpinner } from "../../components";
import { useFlightPlanningTranslation } from "../../translations";

type UpdateAircraftTypeModalProps = {
    isOpen: boolean;
    isLoading: boolean;
    onClose: Function;
    handleSubmit: Function;
};

export const UpdateAircraftTypeModal = (props: UpdateAircraftTypeModalProps) => {
    const { isOpen, isLoading, onClose, handleSubmit } = props;
    const { t: translate } = useFlightPlanningTranslation();

    return (
        <Modal size="md" isCentered isOpen={isOpen} onClose={isLoading ? () => {} : () => onClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> {translate("routeOption.aircraftType.title")} </ModalHeader>
                <ModalBody>
                    <Box> {translate("routeOption.aircraftType.confirmationText")} </Box>
                </ModalBody>
                <ModalFooter>
                    <HStack justifyContent="end">
                        <Button onClick={() => onClose()} variant="secondary" width="24" isDisabled={isLoading}>
                            {translate("common.cancel")}
                        </Button>
                        <Button onClick={() => handleSubmit()} variant="primary" width="24" isDisabled={isLoading}>
                            {isLoading ? <LoadingSpinner size="xs" /> : translate("common.confirm")}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
