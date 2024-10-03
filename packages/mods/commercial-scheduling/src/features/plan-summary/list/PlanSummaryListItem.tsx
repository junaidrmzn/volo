import { Box, Card, HStack, Icon, IconButton, Text, VStack } from "@volocopter/design-library-react";
import { PlanConnectionsState, PlanStatus, PlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import { TextsWithArrow } from "@voloiq/commercial-scheduling-components";
import { useBoxColor, usePlanSummaryCardStatus } from "@voloiq/commercial-scheduling-utils";
import { DateTimeDisplay } from "@voloiq/date-time";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";
import { PlanSummaryActions } from "./PlanSummaryActions";
import { PlanSummaryOfferItem } from "./PlanSummaryOfferItem";
import { PlanSummaryPriceItem } from "./PlanSummaryPriceItem";

type SummaryListItemProps = {
    planSummary: PlanSummary;
    planStatus: PlanStatus;
    planConnectionsState: PlanConnectionsState;
    reloadList: () => void;
    reloadPlan: () => void;
};

export const PlanSummaryListItem = (props: SummaryListItemProps) => {
    const { planSummary, planStatus, planConnectionsState } = props;
    const {
        flightNumber,
        departureVertiportCode,
        departureTime,
        arrivalVertiportCode,
        arrivalTime,
        customItemStatus,
        scheduleItemConnectionStatus: connectionStatus,
        isDeleted,
        isCustomScheduleItemDeletionReq,
    } = planSummary;
    const isPlanSummaryDeletion: boolean = (isDeleted || isCustomScheduleItemDeletionReq) ?? false;
    const cardStatus = usePlanSummaryCardStatus({
        isDeleted: isPlanSummaryDeletion,
        planSummaryStatus: customItemStatus,
        planStatus,
        connectionStatus,
        planConnectionsState,
    });
    const { t } = usePlanSummaryTranslation();
    const boxColor = useBoxColor({
        isDeleted: isPlanSummaryDeletion,
        planConnectionsState,
        planSummaryConnectionStatus: connectionStatus,
    });

    return (
        <Card ariaLabel={flightNumber} onClick={() => {}} status={cardStatus}>
            <HStack alignItems="flex-start" boxSize="full" width="100%" spacing={8}>
                <VStack alignSelf="flex-end" alignItems="flex-start" flex={1}>
                    <Text as={isPlanSummaryDeletion ? "del" : undefined} fontWeight="bold">
                        {flightNumber}
                    </Text>
                    <Box backgroundColor={boxColor} borderRadius="xs">
                        <TextsWithArrow leftText={departureVertiportCode} rightText={arrivalVertiportCode} />
                    </Box>
                    <HStack spacing={0}>
                        <DateTimeDisplay mode="date" value={departureTime} />
                        <Text pr={1}>,</Text>
                        <TextsWithArrow
                            leftText={<DateTimeDisplay mode="time" value={departureTime} />}
                            rightText={<DateTimeDisplay mode="time" value={arrivalTime} />}
                        />
                    </HStack>
                </VStack>
                <VStack alignSelf="flex-end">
                    <HStack spacing={6}>
                        <PlanSummaryPriceItem {...planSummary} />
                        <PlanSummaryOfferItem {...planSummary} />
                    </HStack>
                </VStack>

                <VStack alignItems="flex-end">
                    <IconButton aria-label={t("overview.actionsAriaLabel")} variant="ghost" size="md">
                        <Icon icon="ellipsis" />
                    </IconButton>
                    <PlanSummaryActions {...props} />
                </VStack>
            </HStack>
        </Card>
    );
};
