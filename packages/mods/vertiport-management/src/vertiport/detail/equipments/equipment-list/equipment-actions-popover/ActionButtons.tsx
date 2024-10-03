import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import { Equipment, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../../translations/useVertiportTranslation";
import { EditEquipmentModal } from "./edit-equipment/EditEquipmentModal";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ActionsPopoverBodyProps = {
    equipment: Equipment;
    vertiport: Vertiport;
    refetchData: () => void;
};

export const ActionButtons = (props: ActionsPopoverBodyProps) => {
    const { equipment, vertiport, refetchData } = props;
    const { onClosePopover } = useActionsPopover();
    const { t } = useVertiportTranslation();

    const {
        isOpen: isEditEquipmentModalOpen,
        onClose: onCloseEditEquipmentModal,
        onOpen: onOpenEditEquipmentModal,
    } = useDisclosure();

    return (
        <>
            <VStack spacing={3} alignItems="start">
                <Button
                    leftIcon={<Icon icon="edit" />}
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                        onClosePopover();
                        onOpenEditEquipmentModal();
                    }}
                >
                    {t("equipment.actions.editEquipment")}
                </Button>
            </VStack>
            <EditEquipmentModal
                isOpen={isEditEquipmentModalOpen}
                onClose={onCloseEditEquipmentModal}
                equipment={equipment}
                vertiport={vertiport}
                refetchData={refetchData}
            />
        </>
    );
};
