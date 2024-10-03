import { CardListItem, HStack, Heading, Text, VStack } from "@volocopter/design-library-react";
import type { ChargingProfile } from "@voloiq-typescript-api/battery-management-types";
import { useDateTimeFormatter, useIdSelectionContext } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type ChargingProfileListItemProps = {
    chargingProfile: ChargingProfile;
};

export const ChargingProfileListItem = (props: ChargingProfileListItemProps) => {
    const { chargingProfile } = props;
    const { chargingType, id } = chargingProfile;
    const { t } = useResourcesTranslation();
    const { selectedId, setSelectedId } = useIdSelectionContext();
    const isSelectedId = (id: string) => selectedId === id;
    const { formatToShortDateTime } = useDateTimeFormatter();
    const validFrom = formatToShortDateTime(chargingProfile.validFrom);
    const validTo = chargingProfile.validTo ? formatToShortDateTime(chargingProfile.validTo) : "-";

    return (
        <CardListItem
            key={id}
            onClick={() => setSelectedId?.(id.toString())}
            ariaLabel={chargingProfile.name}
            isSelected={isSelectedId(id.toString())}
        >
            <HStack spacing="6" justifyContent="space-between">
                <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                    <Heading size="md" fontWeight="bold" textTransform="uppercase">
                        {chargingProfile.name}
                    </Heading>
                    <Text size="medium">{id}</Text>
                </VStack>
                <VStack width="100%" wordBreak="break-all">
                    <Heading size="md" fontWeight="bold" textTransform="uppercase">
                        {t("charging-profile.model.chargingType")}
                    </Heading>
                    <Text>{chargingType}</Text>
                </VStack>
                <VStack alignItems="flex-end" width="100%" wordBreak="break-all">
                    <Text> {`${t("charging-profile.model.validFrom")} ${validFrom}`}</Text>
                    <Text> {`${t("charging-profile.model.validTo")} ${validTo}`}</Text>
                </VStack>
            </HStack>
        </CardListItem>
    );
};
