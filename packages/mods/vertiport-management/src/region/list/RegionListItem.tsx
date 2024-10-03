import { HStack, Text, VStack } from "@volocopter/design-library-react";
import { CardListItem } from "@voloiq/card-list-item";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { useFormatDateTime } from "@voloiq/dates";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import type { Region } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

export type RegionListItemProps = {
    region: Region;
} & CardListItemProps;

export const RegionListItem = (props: RegionListItemProps) => {
    const { region, onClick, isSelected } = props;
    const { t } = useVertiportTranslation();
    const { formatDateTime } = useFormatDateTime();

    const validFrom = formatDateTime(region.validFrom);
    const validTo = region.validTo ? formatDateTime(region.validTo) : "-";

    return (
        <CardListItem key={region.id} onClick={onClick!} isSelected={isSelected} ariaLabel={region.name}>
            <CardListItem.Identifier>
                <IdentifierStack mainIdentifier={region.name} />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <HStack justifyContent="space-evenly" align="flex-start" width="full" marginBottom={6}>
                    <TextWithLabel label={t("region.model.latitude")} text={region.center.latitude.toFixed(3)} />
                    <TextWithLabel label={t("region.model.longitude")} text={region.center.longitude.toFixed(3)} />
                </HStack>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <VStack spacing={1} align="flex-start">
                    <Text size="small" lineHeight="double" fontWeight="bold">
                        {t("region.model.validFromTo")}
                    </Text>
                    <Text size="medium">{validFrom}</Text>
                    <Text size="medium">{validTo}</Text>
                </VStack>
            </CardListItem.Status>
        </CardListItem>
    );
};
