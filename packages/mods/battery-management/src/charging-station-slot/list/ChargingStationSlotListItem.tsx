import { HStack, Heading, Tag, Text, VStack } from "@volocopter/design-library-react";
import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useGetChargingStationSlotStatusTagColor } from "./useGetChargingStationSlotStatusTagColor";

export type ChargingStationSlotListItemProps = {
    chargingStationSlot: ChargingStationSlot;
};

export const ChargingStationSlotListItem = (props: ChargingStationSlotListItemProps) => {
    const { chargingStationSlot } = props;
    const { name, chargingStationSlotStatus, validFrom, validTo } = chargingStationSlot;
    const { formatToShortDateTime } = useDateTimeFormatter();
    const validFromFormatted = formatToShortDateTime(validFrom);
    const validToFormatted = validTo ? formatToShortDateTime(validTo) : "-";
    const { chargingStationSlotStatusTagColor } = useGetChargingStationSlotStatusTagColor(chargingStationSlot);
    const { t } = useResourcesTranslation();

    return (
        <HStack spacing="6" justifyContent="space-between">
            <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {name}
                </Heading>
            </VStack>
            <VStack width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {t("charging-station-slot.model.status")}
                </Heading>
                <Tag colorScheme={chargingStationSlotStatusTagColor}>{chargingStationSlotStatus}</Tag>
            </VStack>
            <VStack alignItems="flex-end" width="100%" wordBreak="break-all">
                <Text> {`${t("charging-station-slot.model.validFrom")} ${validFromFormatted}`}</Text>
                <Text> {`${t("charging-station-slot.model.validTo")} ${validToFormatted}`}</Text>
            </VStack>
        </HStack>
    );
};
