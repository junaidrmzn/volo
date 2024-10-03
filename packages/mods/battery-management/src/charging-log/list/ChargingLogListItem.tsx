import { HStack, Heading, Tag, Text, VStack } from "@volocopter/design-library-react";
import type { ChargingLog } from "@voloiq-typescript-api/battery-management-types";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useGetChargingLogStatusTagColor } from "./useGetChargingLogStatusTagColor";

export type ChargingLogListItemProps = {
    chargingLog: ChargingLog;
};

export const ChargingLogListItem = (props: ChargingLogListItemProps) => {
    const { chargingLog } = props;
    const { formatToShortDateTime } = useDateTimeFormatter();
    const eventTimestampStart = chargingLog.eventTimestampStart
        ? formatToShortDateTime(chargingLog.eventTimestampStart)
        : "-";
    const eventTimestampEnd = chargingLog.eventTimestampEnd
        ? formatToShortDateTime(chargingLog.eventTimestampEnd)
        : "-";
    const { chargingLogStatusTagColor } = useGetChargingLogStatusTagColor(chargingLog);

    const { t } = useResourcesTranslation();

    return (
        <HStack spacing="6" justifyContent="space-between">
            <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {t("charging-log.model.logName")}
                </Heading>
                <Text>{chargingLog.name}</Text>
            </VStack>
            <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {t("charging-log.model.chargingStationName")}
                </Heading>
                <Text size="medium">{chargingLog.chargingStation.name}</Text>
            </VStack>
            <VStack width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {t("charging-log.model.uploadStatus")}
                </Heading>
                <Tag colorScheme={chargingLogStatusTagColor}>{chargingLog.uploadStatus}</Tag>
            </VStack>
            <VStack alignItems="flex-end" width="100%" wordBreak="break-all">
                <Heading size="md" fontWeight="bold" textTransform="uppercase">
                    {t("charging-log.model.eventDuration")}
                </Heading>
                <Text> {`${eventTimestampStart} - ${eventTimestampEnd}`}</Text>
            </VStack>
        </HStack>
    );
};
