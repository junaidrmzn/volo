import { Box, Flex, Tag, VStack } from "@volocopter/design-library-react";
import type { Event } from "@voloiq-typescript-api/network-scheduling-types";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { CardListItem } from "@voloiq/card-list-item";
import { useFormatDateTime } from "@voloiq/dates";
import { useEventTranslation } from "../translations/useEventTranslation";

export type EventListItemProps = {
    event: Pick<Event, "name" | "startDate" | "endDate" | "isBlockedForMission" | "id" | "aircraft">;
} & CardListItemProps;

export const EventListItem = (props: EventListItemProps) => {
    const { event, ...cardListItemProps } = props;
    const { name, startDate, endDate, isBlockedForMission, aircraft } = event;
    const { formatDateTime } = useFormatDateTime();
    const { t } = useEventTranslation();

    const getAircraftDetails = () => {
        let detail = aircraft?.msn;
        detail += aircraft?.registration ? ` (${aircraft?.registration})` : "";
        detail += ` - ${aircraft?.aircraftTypeName}`;
        return detail;
    };

    return (
        <CardListItem {...cardListItemProps}>
            <CardListItem.Identifier>
                <VStack spacing={0} alignItems="flex-start">
                    <Box fontWeight="bold" fontSize="lg" lineHeight="short" marginBottom={1} title={t("model.name")}>
                        {name}
                    </Box>
                    <Box fontSize="lg" lineHeight="short" fontWeight="light" title={t("model.aircraft")}>
                        {aircraft && getAircraftDetails()}
                    </Box>
                    <Box>
                        {formatDateTime(startDate)}&nbsp;-&nbsp;{formatDateTime(endDate)}
                    </Box>
                </VStack>
            </CardListItem.Identifier>
            <CardListItem.Status>
                {isBlockedForMission && (
                    <Flex justifyContent="flex-end">
                        <Tag colorScheme="gray">{t("model.blockedForMission")}</Tag>
                    </Flex>
                )}
            </CardListItem.Status>
        </CardListItem>
    );
};
