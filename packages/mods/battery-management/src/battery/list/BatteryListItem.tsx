/* eslint-disable no-constant-condition */
import { CardListItem, HStack, Heading, Tag, Text, VStack } from "@volocopter/design-library-react";
import type { Battery } from "@voloiq-typescript-api/battery-management-types";
import { useDateTimeFormatter, useIdSelectionContext } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useGetBatteryStatusTagColor } from "./useGetBatteryStatusTagColor";

export type BatteryListItemProps = {
    battery: Battery;
};
export const BatteryListItem = (props: BatteryListItemProps) => {
    const { battery } = props;
    const { t } = useResourcesTranslation();
    const { batteryStatusTagColor } = useGetBatteryStatusTagColor(battery);
    const { selectedId, setSelectedId } = useIdSelectionContext();
    const { formatToShortDateTime } = useDateTimeFormatter();
    const isSelectedId = (id: string) => selectedId === id;
    const validFrom = formatToShortDateTime(battery.validFrom);
    const validTo = battery.validTo ? formatToShortDateTime(battery.validTo) : "-";

    return (
        <CardListItem
            key={battery.id}
            onClick={() => setSelectedId?.(battery.id.toString())}
            ariaLabel={battery.name}
            isSelected={isSelectedId(battery.id.toString())}
        >
            <HStack spacing="6" justifyContent="space-between">
                <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                    <Heading size="md" fontWeight="bold" textTransform="uppercase">
                        {battery.name}
                    </Heading>
                    <Text size="medium">{battery.batteryType.name}</Text>
                </VStack>
                <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                    <Heading size="md" fontWeight="bold" textTransform="uppercase">
                        {t("battery.model.location")}
                    </Heading>
                    <Text size="medium">{battery.location.name}</Text>
                </VStack>
                <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                    <Heading size="md" fontWeight="bold" textTransform="uppercase">
                        {t("battery.model.actstatus")}
                    </Heading>
                    <Tag data-testid="battery-status-badge" colorScheme={batteryStatusTagColor}>
                        {battery.actStatus}
                    </Tag>
                </VStack>

                <VStack alignItems="flex-end" width="100%" wordBreak="break-all">
                    <Text>
                        {t("battery.model.validFrom")} {validFrom}
                    </Text>
                    <Text>
                        {t("battery.model.validTo")} {validTo}
                    </Text>
                </VStack>
            </HStack>
        </CardListItem>
    );
};
