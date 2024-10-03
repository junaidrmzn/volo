import { Box, SimpleGrid, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import type { Equipment, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";
import { ColumnText } from "./ColumnText";
import { HeaderText } from "./HeaderText";
import { ActionsPopover } from "./equipment-actions-popover/ActionsPopover";
import { ActionsPopoverProvider } from "./equipment-actions-popover/popover-context/ActionsPopoverProvider";

type PEquipmentListProps = {
    equipments: Equipment[];
    vertiport: Vertiport;
    refetchData: () => void;
};

export const EquipmensList = (props: PEquipmentListProps) => {
    const { equipments, vertiport, refetchData } = props;
    const { formatDateTime } = useFormatDateTime();
    const { t } = useVertiportTranslation();
    const DividerWithoutMargin = () => <Box width="full" borderBottom="1px" borderBottomColor="darkBlue.200" />;
    return (
        <VStack width="full" divider={<DividerWithoutMargin />} py="0">
            <SimpleGrid columns={5} width="full" alignItems="flex-start" gridAutoFlow="column" px="3" py="2">
                <HeaderText>{t("equipment.model.deviceId")}</HeaderText>
                <HeaderText>{t("equipment.model.name")}</HeaderText>
                <HeaderText>{t("equipment.model.location")}</HeaderText>
                <HeaderText>{t("equipment.model.validFrom")}</HeaderText>
                <HeaderText>{t("equipment.model.validTo")}</HeaderText>
            </SimpleGrid>
            {equipments.map((equipment) => (
                <SimpleGrid
                    columns={5}
                    width="full"
                    alignItems="flex-start"
                    gridAutoFlow="column"
                    key={`equipment-${equipment.id}`}
                    px="3"
                    py="2"
                    bg={
                        equipment?.validTo && new Date(equipment?.validTo) < new Date()
                            ? "decorative1Emphasized"
                            : "unset"
                    }
                >
                    <ColumnText>{equipment.deviceId}</ColumnText>
                    <ColumnText>{equipment.name}</ColumnText>
                    <ColumnText>{equipment.location}</ColumnText>
                    <ColumnText> {formatDateTime(equipment.validFrom)}</ColumnText>
                    <ColumnText>{equipment.validTo ? formatDateTime(equipment.validTo) : "N/A"}</ColumnText>
                    <ColumnText textAlign="end">
                        <ActionsPopoverProvider>
                            <ActionsPopover equipment={equipment} vertiport={vertiport} refetchData={refetchData} />
                        </ActionsPopoverProvider>
                    </ColumnText>
                </SimpleGrid>
            ))}
        </VStack>
    );
};
