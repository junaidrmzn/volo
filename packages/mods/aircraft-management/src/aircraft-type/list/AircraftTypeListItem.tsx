import { Box, Tag, VStack } from "@volocopter/design-library-react";
import type { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { CardListItem } from "@voloiq/card-list-item";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { useFormatDateTime } from "@voloiq/dates";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type AircraftTypeListItemProps = {
    aircraftType: AircraftType;
} & CardListItemProps;

export const AircraftTypeListItem = (props: AircraftTypeListItemProps) => {
    const { aircraftType, onClick, isSelected } = props;
    const { t } = useResourcesTranslation();
    const { formatDateTime } = useFormatDateTime();

    return (
        <CardListItem key={aircraftType.id} onClick={onClick!} isSelected={isSelected} ariaLabel={aircraftType.name}>
            <CardListItem.Identifier>
                <IdentifierStack mainIdentifier={aircraftType.name} secondaryIdentifier={aircraftType.productLine} />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <TextWithLabel label={t("aircraft-type.model.aircraftCount")} text={aircraftType.aircraftCount} />
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <VStack alignItems="flex-end" spacing={0}>
                    {aircraftType.synchronizedWithLeon && (
                        <Tag colorScheme="info-subtle">
                            <Tag.Label variant="light">{t("aircraft-type.model.leon")}</Tag.Label>
                        </Tag>
                    )}
                    <Box title={t("aircraft-type.model.validFrom")}>{formatDateTime(aircraftType.validFrom)}</Box>
                    <Box title={t("aircraft-type.model.validTo")}>
                        -&nbsp;{aircraftType.validTo ? formatDateTime(aircraftType.validTo) : "N/A"}
                    </Box>
                </VStack>
            </CardListItem.Status>
        </CardListItem>
    );
};
