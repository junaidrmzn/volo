import { Card, HStack, Icon, IconButton, Text, VStack } from "@volocopter/design-library-react";
import { ScheduleItem } from "@voloiq/commercial-scheduling-api/v1";
import { ScheduleItemStatusTag, TextWithLabel, TextsWithArrow } from "@voloiq/commercial-scheduling-components";
import { DateTimeDisplay } from "@voloiq/date-time";
import { useScheduleItemTranslation } from "../translations/useScheduleItemTranslation";

type ScheduleItemListItemProps = {
    scheduleItem: ScheduleItem;
};

export const ScheduleItemListItem = (props: ScheduleItemListItemProps) => {
    const { scheduleItem } = props;
    const { arrivalTime, connection, departureTime, flightNumber, status } = scheduleItem;
    const { arrivalVertiportCode, departureVertiportCode } = connection;
    const { t } = useScheduleItemTranslation();

    return (
        <Card ariaLabel={flightNumber} onClick={() => {}} status="base">
            <HStack alignItems="flex-start" boxSize="full" width="100%">
                <VStack alignSelf="flex-end" alignItems="flex-start" flex={1}>
                    <HStack spacing={3}>
                        <Text fontWeight="bold">{flightNumber}</Text>
                        <ScheduleItemStatusTag status={status} />
                    </HStack>
                    <TextsWithArrow leftText={departureVertiportCode} rightText={arrivalVertiportCode} />
                    <HStack spacing={0}>
                        <DateTimeDisplay mode="date" value={departureTime} />
                        <Text pr={1}>,</Text>
                        <TextsWithArrow
                            leftText={<DateTimeDisplay mode="time" value={departureTime} />}
                            rightText={<DateTimeDisplay mode="time" value={arrivalTime} />}
                        />
                    </HStack>
                </VStack>
                <TextWithLabel label={t("overview.price")} text="-" />
                <TextWithLabel label={t("overview.category")} text="-" />
                <TextWithLabel label={t("overview.booking")} text="-" />
                <VStack alignItems="flex-end">
                    <IconButton aria-label={t("overview.actionsAriaLabel")} variant="ghost" size="md">
                        <Icon icon="ellipsis" />
                    </IconButton>
                    <IconButton aria-label={t("overview.detailsAriaLabel")} variant="ghost" size="md">
                        <Icon icon="chevronRight" />
                    </IconButton>
                </VStack>
            </HStack>
        </Card>
    );
};
