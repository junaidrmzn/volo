import { Flex, HStack, Tag, Text, VStack } from "@volocopter/design-library-react";
import React from "react";
import { CardListItem } from "@voloiq/card-list-item";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { useFormatDateTime } from "@voloiq/dates";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

export type VertiportListItemProps = {
    vertiport: Vertiport;
} & CardListItemProps;

export const VertiportListItem = (props: VertiportListItemProps) => {
    const { vertiport, onClick, isSelected } = props;
    const { t } = useVertiportTranslation();
    const { formatDateTime } = useFormatDateTime();

    const validFrom = formatDateTime(vertiport.validFrom);
    const validTo = vertiport.validTo ? formatDateTime(vertiport.validTo) : "-";

    return (
        <CardListItem key={vertiport.id} onClick={onClick!} isSelected={isSelected} ariaLabel={vertiport.name}>
            <CardListItem.Identifier>
                <IdentifierStack mainIdentifier={vertiport.name} />
            </CardListItem.Identifier>
            <CardListItem.Identifier>
                <IdentifierStack
                    mainIdentifier={vertiport.shortName}
                    secondaryIdentifier={vertiport.region.name}
                    thirdIdentifier={vertiport.name}
                />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <HStack justifyContent="space-evenly" align="flex-start" width="full" marginBottom={7}>
                    <TextWithLabel label={t("vertiport.model.code")} text={vertiport.code} />
                    <TextWithLabel label={t("vertiport.model.iataCode")} text={vertiport.iataCode ?? undefined} />
                    <TextWithLabel label={t("vertiport.model.icaoCode")} text={vertiport.icaoCode ?? undefined} />
                </HStack>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <Flex>
                    <HStack justifyContent="flex-start" width="50%">
                        <VStack spacing={0} align="flex-start" alignContent="center" marginTop={5} marginBottom={0}>
                            <Text size="small" lineHeight="double" fontWeight="bold" marginBottom={2}>
                                {t("vertiport.model.validFromTo")}
                            </Text>
                            <Text size="medium">{validFrom}</Text>
                            <Text size="medium">{validTo}</Text>
                        </VStack>
                    </HStack>
                    {(vertiport.sitaId || vertiport.synchronizedWithLeon) && (
                        <HStack justifyContent="flex-end" width="50%">
                            {vertiport.sitaId && (
                                <Tag colorScheme="info-subtle">
                                    <Tag.Label variant="light">{t("vertiport.sita")}</Tag.Label>
                                </Tag>
                            )}
                            {vertiport.synchronizedWithLeon && (
                                <Tag colorScheme="info-subtle">
                                    <Tag.Label variant="light">{t("vertiport.leon")}</Tag.Label>
                                </Tag>
                            )}
                        </HStack>
                    )}
                </Flex>
            </CardListItem.Status>
        </CardListItem>
    );
};
