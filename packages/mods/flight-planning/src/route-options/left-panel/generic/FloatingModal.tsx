import {
    Button,
    Divider,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@volocopter/design-library-react";

type FloatingModalProps = {
    size?: string;
    title?: string;
    subTitle?: string;
    isOpen: boolean;
    onClose: (value: boolean) => void;
    hasFooter?: boolean;
    saveTitle?: string;
    cancelTitle?: string;
};

export const FloatingModal: FCC<FloatingModalProps> = (props) => {
    const { size, title, isOpen, onClose, hasFooter, children, subTitle, saveTitle, cancelTitle } = props;

    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)} size={size}>
            <ModalOverlay />
            <ModalContent scrollBehavior="auto">
                <ModalHeader m={2}>
                    <HStack>
                        <Text fontSize={14} display="inline" fontWeight={600}>
                            {title}
                        </Text>
                        <Text fontSize={14} display="inline">
                            - {subTitle}
                        </Text>
                    </HStack>
                    <ModalCloseButton />
                </ModalHeader>
                <Divider />
                <ModalBody>{children}</ModalBody>
                {hasFooter && (
                    <ModalFooter>
                        <Button onClick={() => onClose(false)}>{cancelTitle}</Button>
                        <Button variant="primary">{saveTitle}</Button>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};
