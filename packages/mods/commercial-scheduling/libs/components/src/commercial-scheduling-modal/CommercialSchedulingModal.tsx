import {
    Divider,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Text,
} from "@volocopter/design-library-react";

export type CommercialSchedulingModalProps = {
    heading: string;
    subHeading: string;
    isOpen: boolean;
    onClose: () => void;
} & Pick<ModalProps, "size" | "isCentered">;

export const CommercialSchedulingModal: React.FC<CommercialSchedulingModalProps> = (props) => {
    const { size = "lg", isCentered = true, heading, subHeading, children, isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered={isCentered}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <HStack spacing={3}>
                        <Text fontWeight="bold">{heading}</Text>
                        <Icon aria-label="minus" icon="minus" size={3} />
                        <Text>{subHeading}</Text>
                    </HStack>
                </ModalHeader>
                <Divider mb={4} />
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modal>
    );
};
