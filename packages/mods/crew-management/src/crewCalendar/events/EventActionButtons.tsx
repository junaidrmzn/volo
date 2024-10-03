import {
    Button,
    Divider,
    Icon,
    IconButton,
    Popover,
    Portal,
    VStack,
    useDisclosure,
} from "@volocopter/design-library-react";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

type EventActionButtonsProps = {
    onOpenEditModal: () => void;
    onOpenDeleteModal: () => void;
};

export const EventActionButtons = (props: EventActionButtonsProps) => {
    const { onOpenEditModal, onOpenDeleteModal } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { t } = useCrewApiTranslation();

    return (
        <Popover placement="auto" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <Popover.Trigger>
                <IconButton aria-label="actionButton" variant="ghost" size="sm">
                    <Icon icon="ellipsisVertical" size={5} />
                </IconButton>
            </Popover.Trigger>
            <Popover.Overlay />
            <Portal>
                <Popover.Content>
                    <Popover.Header
                        title={t("calendar.actionButtons.headerLabel")}
                        closeButtonAriaLabel={t("calendar.actionButtons.cancel")}
                    />
                    <Divider mb={4} />
                    <Popover.Body>
                        <VStack spacing={3} alignItems="start" onClick={(event) => event.stopPropagation()}>
                            <Button leftIcon={<Icon icon="edit" size={5} />} variant="ghost" onClick={onOpenEditModal}>
                                {t("calendar.actionButtons.edit")}
                            </Button>
                            <Button
                                leftIcon={<Icon icon="cancel" size={5} />}
                                variant="ghost"
                                onClick={onOpenDeleteModal}
                            >
                                {t("calendar.actionButtons.delete")}
                            </Button>
                        </VStack>
                    </Popover.Body>
                </Popover.Content>
            </Portal>
        </Popover>
    );
};
