import {
    Box,
    Button,
    Divider,
    HStack,
    Heading,
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
import { useResourceBulkEditTranslations } from "./translations/useResourceBulkEditTranslations";
import { EditableProperty } from "./useBulkEditForm";

type BulkEditConfirmModalProps = {
    onCancel: () => void;
    onConfirm: () => void;
    isOpen: boolean;
    entries: number;
    editableProperty: EditableProperty;
    isLoading: boolean;
};

export const BulkEditConfirmModal = (props: BulkEditConfirmModalProps) => {
    const { isOpen, onCancel, onConfirm, entries, editableProperty, isLoading } = props;
    const { t } = useResourceBulkEditTranslations();

    return (
        <Modal isOpen={isOpen} onClose={onCancel} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton size="lg" onClick={onCancel} />
                <ModalHeader display="flex" alignItems="center">
                    {t("Confirm")}&nbsp;<Heading>-&nbsp;{t("Multi Edit")}</Heading>
                </ModalHeader>
                <Divider />
                <ModalBody>
                    <VStack alignItems="start" gap={5}>
                        <HStack>
                            <Text>{t("You are about to edit multiple resources")}</Text>
                            <Text fontWeight="bold">({t("entries", { entries })})</Text>
                        </HStack>
                        {editableProperty?.fieldType && editableProperty?.newValue && (
                            <HStack>
                                <Text fontWeight="bold">{editableProperty.fieldType}</Text>
                                <Text>{" to "}</Text>
                                <Text fontWeight="bold">{editableProperty.newValue}</Text>
                            </HStack>
                        )}
                        <Box>{t("Are you sure? You can’t undo this action afterwards")}</Box>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onCancel} variant="secondary">
                        {t("Cancel")}
                    </Button>
                    <Button variant="primary" type="submit" isLoading={isLoading} onClick={onConfirm}>
                        {t("Confirm")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
