import {
    Button,
    ButtonProps,
    Divider,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import type { IconProps } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { useConfirmationModalTranslation } from "./translation/useConfirmationModalTranslation";

export type ConfirmationModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    title: string;
    type: string;
    message: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm: () => void;
    confirmButtonIcon?: IconProps["icon"];
    showConfirmIconButton?: boolean;
    confirmationFormFields?: ReactNode;
    confirmButtonVariant?: ButtonProps["variant"];
    cancelButtonVariant?: ButtonProps["variant"];
    formId?: string;
};

export const ConfirmationModal = (props: ConfirmationModalProps) => {
    const { t } = useConfirmationModalTranslation();

    const {
        onClose,
        isOpen = false,
        onConfirm,
        message,
        title,
        type,
        cancelButtonText = t("Cancel"),
        confirmButtonText = t("Confirm"),
        confirmButtonIcon = "check",
        showConfirmIconButton = true,
        confirmButtonVariant = "secondary",
        cancelButtonVariant = "primary",
        confirmationFormFields,
        formId,
    } = props;

    return (
        <Modal size="xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton size="lg" />
                <ModalHeader as={VStack} w="full" alignItems="flex-start">
                    <HStack flex={1} justifyContent="flex-start" spacing={2}>
                        <Text fontSize="lg" fontWeight="semibold">
                            {type}
                        </Text>
                        <Text>–</Text>
                        <Text fontSize="lg">{title}</Text>
                    </HStack>
                </ModalHeader>
                <Divider />
                <ModalBody py={3} fontSize="sm">
                    {confirmationFormFields ? <VStack width="100%">{confirmationFormFields}</VStack> : message}
                </ModalBody>
                <ModalFooter as={HStack} justifyContent="flex-end" spacing={1}>
                    <Button variant={cancelButtonVariant} onClick={onClose}>
                        {cancelButtonText}
                    </Button>
                    <Button
                        {...(showConfirmIconButton && { leftIcon: <Icon size={4} icon={confirmButtonIcon} /> })}
                        variant={confirmButtonVariant}
                        onClick={onConfirm}
                        {...(formId && { form: formId, type: "submit" })}
                    >
                        {confirmButtonText}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
