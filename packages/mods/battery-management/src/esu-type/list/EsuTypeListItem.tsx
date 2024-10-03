import { CardListItem, HStack, Heading, Text, VStack } from "@volocopter/design-library-react";
import type { EsuType } from "@voloiq-typescript-api/battery-management-types";
import { useDateTimeFormatter, useIdSelectionContext } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type EsuTypeListItemProps = {
    esuType: EsuType;
};

export const EsuTypeListItem = (props: EsuTypeListItemProps) => {
    const { esuType } = props;
    const { t } = useResourcesTranslation();
    const { selectedId, setSelectedId } = useIdSelectionContext();
    const isSelectedId = (id: string) => selectedId === id;
    const { formatToShortDateTime } = useDateTimeFormatter();

    const aircraftTypes = esuType.aircraftTypes
        .map((aircraftType) => aircraftType.name)
        .toString()
        .replace(",", ", ");

    const chargingMode = esuType.manualCharging
        ? t("esu-type.model.chargingMode.manual")
        : t("esu-type.model.chargingMode.automatic");

    const validFrom = formatToShortDateTime(esuType.validFrom);
    const validTo = esuType.validTo ? formatToShortDateTime(esuType.validTo) : "-";

    return (
        <CardListItem
            key={esuType.id}
            onClick={() => setSelectedId?.(esuType.id.toString())}
            ariaLabel={esuType.name}
            isSelected={isSelectedId(esuType.id.toString())}
        >
            <HStack spacing="6" justifyContent="space-between">
                <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                    <Heading size="md" fontWeight="bold" textTransform="uppercase">
                        {esuType.name}
                    </Heading>
                    <Text size="medium">{aircraftTypes}</Text>
                </VStack>
                <VStack width="100%" wordBreak="break-all">
                    <Text>{chargingMode}</Text>
                </VStack>
                <VStack alignItems="flex-end" width="100%" wordBreak="break-all">
                    <Text> {`${t("esu-type.model.validFrom")} ${validFrom}`}</Text>
                    <Text> {`${t("esu-type.model.validTo")} ${validTo}`}</Text>
                </VStack>
            </HStack>
        </CardListItem>
    );
};
