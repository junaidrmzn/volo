import { CardListItem, HStack, Heading, Text, VStack } from "@volocopter/design-library-react";
import type { Esu } from "@voloiq-typescript-api/battery-management-types";
import { useDateTimeFormatter, useIdSelectionContext } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type EsuListItemProps = {
    esu: Esu;
};

export const EsuListItem = (props: EsuListItemProps) => {
    const { esu } = props;
    const { t } = useResourcesTranslation();
    const { selectedId, setSelectedId } = useIdSelectionContext();
    const { formatToShortDateTime } = useDateTimeFormatter();
    const isSelectedId = (id: string) => selectedId === id;
    const validFrom = formatToShortDateTime(esu.validFrom);
    const validTo = esu.validTo ? formatToShortDateTime(esu.validTo) : "-";

    return (
        <CardListItem
            key={esu.id}
            onClick={() => setSelectedId?.(esu.id.toString())}
            ariaLabel={esu.name}
            isSelected={isSelectedId(esu.id.toString())}
        >
            <HStack spacing="6" justifyContent="space-between">
                <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                    <Heading size="md" fontWeight="bold" textTransform="uppercase">
                        {esu.name}
                    </Heading>
                    <Text size="medium">{esu.serial}</Text>
                </VStack>
                <VStack alignItems="flex-start" width="100%" wordBreak="break-all">
                    <Heading size="md" fontWeight="bold" textTransform="uppercase">
                        {esu.status}
                    </Heading>
                    <Text size="medium">{esu.technicalStatus}</Text>
                </VStack>
                <VStack alignItems="flex-end" width="100%" wordBreak="break-all">
                    <Text>
                        {t("esu.model.validFrom")} {validFrom}
                    </Text>
                    <Text>
                        {t("esu.model.validTo")} {validTo}
                    </Text>
                </VStack>
            </HStack>
        </CardListItem>
    );
};
