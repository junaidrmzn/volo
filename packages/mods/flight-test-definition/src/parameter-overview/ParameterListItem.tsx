import { Box, Flex, Tag } from "@volocopter/design-library-react";
import type { TestPointParameter } from "@voloiq-typescript-api/ftd-types";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { CardListItem } from "@voloiq/card-list-item";
import { IdentifierStack } from "@voloiq/text-layouts";
import { useParameterOverviewTranslation } from "./translations/useParameterOverviewTranslation";

export type ParameterListItemProps = {
    parameter: TestPointParameter;
    cardListItemProps: CardListItemProps;
};

export const ParameterListItem = (props: ParameterListItemProps) => {
    const { parameter, cardListItemProps } = props;
    const { t } = useParameterOverviewTranslation();

    const unit = parameter.unit.trim();
    const unitString = unit || "-";

    return (
        <CardListItem {...cardListItemProps}>
            <CardListItem.Identifier>
                <IdentifierStack
                    mainIdentifier={parameter.name}
                    secondaryIdentifier={unitString}
                    thirdIdentifier={parameter.acronym}
                />
            </CardListItem.Identifier>
            <CardListItem.Status>
                <Flex justifyContent="flex-end">
                    <Box>{!parameter.isActive && <Tag colorScheme="gray">{t("Inactive")}</Tag>}</Box>
                </Flex>
            </CardListItem.Status>
        </CardListItem>
    );
};
