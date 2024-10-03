import type { CardListItemProps } from "@volocopter/design-library-react";
import { Box, HStack, VStack } from "@volocopter/design-library-react";
import { CardListItem } from "@voloiq/card-list-item";
import { useParams } from "@voloiq/routing";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { ValidForOperationTag } from "../../../../components/ValidForOperationTag";
import { useFlightPlanningTranslation } from "../../../../translations";
import type { RouteOptionResource } from "../types";

type RouteOptionListItemProps = {
    routeOption: RouteOptionResource;
    handleToggleRouteOption: () => void;
    cardListItemProps: CardListItemProps;
};
export const RouteOptionsListItem = (props: RouteOptionListItemProps) => {
    const { routeOption, handleToggleRouteOption, cardListItemProps } = props;
    const { t } = useFlightPlanningTranslation();
    const { routeOptionId } = useParams();

    const isSelected = routeOptionId ? routeOptionId === routeOption.id : false;

    return (
        <CardListItem
            onClick={handleToggleRouteOption}
            ariaLabel={`route-option-${routeOption.id}`}
            isSelected={isSelected}
            {...cardListItemProps}
        >
            <CardListItem.Identifier>
                <IdentifierStack
                    mainIdentifier={routeOption.name}
                    secondaryIdentifier={`${routeOption.departureExternalVertiport.name} - ${routeOption.arrivalExternalVertiport.name}`}
                />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <HStack
                    justifyContent="space-evenly"
                    align="flex-start"
                    width="full"
                    data-testid={`flight-list-item-${routeOption.id}`}
                >
                    <TextWithLabel label={t("routeOption.properties.aircraftType")} text={routeOption.aircraftType} />
                </HStack>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <VStack spacing={0} alignItems="flex-end" height="full">
                    <Box flex={1}>
                        <ValidForOperationTag validForOperation={routeOption.validForOperation} />
                    </Box>
                </VStack>
            </CardListItem.Status>
        </CardListItem>
    );
};
