import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import { Pad, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../../translations/useVertiportTranslation";
import { EditPadModal } from "./edit-pad/EditPadModal";
import { AddPadEvent } from "./pad-events/add-pad-event/AddPadEvent";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ActionsPopoverBodyProps = {
    pad: Pad;
    vertiport: Vertiport;
};

export const ActionButtons = (props: ActionsPopoverBodyProps) => {
    const { pad, vertiport } = props;
    const { setActionsPopoverState, onClosePopover } = useActionsPopover();
    const { t } = useVertiportTranslation();

    const { isOpen: isEditPadModalOpen, onClose: onCloseEditPadModal, onOpen: onOpenEditPadModal } = useDisclosure();
    const {
        isOpen: isAddPadEventModalOpen,
        onClose: onCloseAddPadEventModal,
        onOpen: onOpenAddPadEventModal,
    } = useDisclosure();

    return (
        <>
            <VStack spacing={3} alignItems="start">
                <Button
                    leftIcon={<Icon icon="add" />}
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                        onClosePopover();
                        onOpenAddPadEventModal();
                    }}
                >
                    {t("fatoStand.actions.addEvent")}
                </Button>
                <Button
                    leftIcon={<Icon icon="edit" />}
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                        onClosePopover();
                        onOpenEditPadModal();
                    }}
                >
                    {t("fatoStand.actions.editFatoStand")}
                </Button>
                <Button
                    leftIcon={<Icon icon="delete" />}
                    variant="ghost"
                    size="lg"
                    onClick={() => setActionsPopoverState("delete")}
                >
                    {t("fatoStand.actions.deleteFatoStand")}
                </Button>
            </VStack>
            <EditPadModal isOpen={isEditPadModalOpen} onClose={onCloseEditPadModal} pad={pad} vertiport={vertiport} />
            <AddPadEvent isOpen={isAddPadEventModalOpen} onClose={onCloseAddPadEventModal} pad={pad} />
        </>
    );
};
