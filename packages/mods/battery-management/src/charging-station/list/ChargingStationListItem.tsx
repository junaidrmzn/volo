import { HStack, Heading, Tag, Text, VStack } from "@volocopter/design-library-react";
import type { ChargingStation } from "@voloiq-typescript-api/battery-management-types";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useGetChargingStationStatusTagColor } from "./useGetChargingStationStatusTagColor";

export type ChargingStationListItemProps = {
    chargingStation: ChargingStation;
};

export const ChargingStationListItem = (props: ChargingStationListItemProps) => {
    const { chargingStation } = props;
    const { formatToShortDateTime } = useDateTimeFormatter();
    const validFrom = formatToShortDateTime(chargingStation.validFrom);
    const { chargingStationStatusTagColor } = useGetChargingStationStatusTagColor(chargingStation);
    const validTo = chargingStation.validTo ? formatToShortDateTime(chargingStation.validTo) : "-";

    const { t } = useResourcesTranslation();

    return (
        <HStack spacing="6" justifyContent="space-between">
            <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {chargingStation.name}
                </Heading>
            </VStack>
            <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {t("charging-station.model.vertiport")}
                </Heading>
                <Text size="medium">{chargingStation.vertiport?.name}</Text>
            </VStack>
            <VStack width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {t("charging-station.model.status")}
                </Heading>
                <Tag colorScheme={chargingStationStatusTagColor}>{chargingStation.chargingStationStatus}</Tag>
            </VStack>
            <VStack alignItems="flex-end" width="100%" wordBreak="break-all">
                <Text> {`${t("charging-station.model.validFrom")} ${validFrom}`}</Text>
                <Text> {`${t("charging-station.model.validTo")} ${validTo}`}</Text>
            </VStack>
        </HStack>
    );
};
