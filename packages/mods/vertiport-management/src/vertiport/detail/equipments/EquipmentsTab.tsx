import { Button, VStack, useDisclosure } from "@volocopter/design-library-react";
import { SectionHeader } from "@voloiq/text-layouts";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useGetAllEquipments } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../translations/useVertiportTranslation";
import { AddEquipmentModal } from "./add-equipment/AddEquipmentModal";
import { EquipmensList } from "./equipment-list/EquipmentsList";

type EquipmentsTabProps = {
    vertiport: Vertiport;
};

export const EquipmentsTab = (props: EquipmentsTabProps) => {
    const { vertiport } = props;
    const { onClose, isOpen, onOpen } = useDisclosure();
    const { data: equipments, sendRequest: refetchData } = useGetAllEquipments({
        vertiportId: vertiport.id,
        params: { orderBy: "validTo:desc" },
    });
    const { t } = useVertiportTranslation();

    return (
        <>
            <VStack spacing={3} alignItems="stretch">
                <SectionHeader label={t("equipment.header")} m={2}>
                    <Button variant="ghost" onClick={() => onOpen()}>
                        {t("equipment.addEquipment")}
                    </Button>
                </SectionHeader>
                <EquipmensList equipments={equipments} vertiport={vertiport} refetchData={refetchData} />
            </VStack>
            <AddEquipmentModal vertiport={vertiport} onClose={onClose} isOpen={isOpen} refetchData={refetchData} />
        </>
    );
};
