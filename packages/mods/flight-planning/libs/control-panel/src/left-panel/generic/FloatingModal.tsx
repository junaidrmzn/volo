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
import { useFlightPlanningTranslation } from "../translations/useFlightPlanningTranslation";

type ModalWrapperProps = {
    size: string;
    title: string;
    subTitle: string;
    isOpen: boolean;
    onClose: () => void;
    hasFooter?: boolean;
};

export const FloatingModal: FCC<ModalWrapperProps> = (props) => {
    const { size, title, subTitle, isOpen, onClose, hasFooter, children } = props;
    const { t } = useFlightPlanningTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalOverlay />
            <ModalContent scrollBehavior="auto">
                <ModalHeader m={2}>
                    <HStack>
                        <Text fontSize={14} fontWeight={600}>
                            {title}
                        </Text>
                        <Text>-</Text>
                        <Text fontSize={14}>{subTitle}</Text>
                    </HStack>
                    <ModalCloseButton />
                </ModalHeader>
                <Divider />
                <ModalBody>{children}</ModalBody>
                {hasFooter && (
                    <ModalFooter>
                        <Button onClick={onClose}>{t("common.close")}</Button>
                        <Button variant="primary">{t("common.save")}</Button>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};
