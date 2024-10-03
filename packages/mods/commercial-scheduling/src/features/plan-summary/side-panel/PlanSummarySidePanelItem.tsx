import { Card, Divider, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import {
    DateTimeDisplayWithLabel,
    PlanSummaryCustomItemStatusTag,
    TextsWithArrow,
} from "@voloiq/commercial-scheduling-components";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";
import {
    PlanSummarySidePanelItemActions,
    PlanSummarySidePanelItemActionsProps,
} from "./PlanSummarySidePanelItemActions";

type PlanSummarySidePanelItemProps = {
    withActions: boolean;
} & PlanSummarySidePanelItemActionsProps;

export const PlanSummarySidePanelItem = (props: PlanSummarySidePanelItemProps) => {
    const { planSummary, withActions } = props;
    const {
        flightNumber,
        departureVertiportCode,
        arrivalVertiportCode,
        departureTime,
        prices,
        offers,
        isCustomOverwritten,
        customItemStatus,
        customPrice,
        customOfferRunwayUnit,
        customOfferRunwayValue,
        customComments,
        isDeleted,
        isCustomScheduleItemDeletionReq,
    } = planSummary;
    const isPlanSummaryDeletion = isDeleted || isCustomScheduleItemDeletionReq;
    const { t } = usePlanSummaryTranslation();

    return (
        <Card width="full">
            <VStack alignItems="flex-start">
                <HStack alignItems="flex-start" alignSelf="stretch" justifyContent="space-between">
                    <VStack alignItems="flex-start">
                        <Text as={isPlanSummaryDeletion ? "del" : undefined}>{flightNumber}</Text>
                        <TextsWithArrow leftText={departureVertiportCode} rightText={arrivalVertiportCode} />
                        <DateTimeDisplayWithLabel value={departureTime} />
                    </VStack>
                    <PlanSummaryCustomItemStatusTag
                        status={customItemStatus}
                        isCustomOverwritten={isCustomOverwritten}
                    />
                </HStack>
                <Divider />
                {isPlanSummaryDeletion ? (
                    <HStack alignItems="flex-start">
                        <Text>
                            {prices?.[0]?.price ?? ""} {prices?.[0]?.currency ?? ""}
                        </Text>
                        <Text align="center">
                            <Icon icon="dot" size={1} />
                        </Text>
                        <Text>
                            {offers?.[0]?.offerRunwayValue ?? ""}{" "}
                            {offers?.[0]?.offerRunwayUnit ? t(`units.${offers[0].offerRunwayUnit}`) : ""}
                        </Text>
                    </HStack>
                ) : (
                    <HStack alignItems="flex-start">
                        <Text as="del">{prices?.[0]?.price ?? ""}</Text>
                        <Text>
                            {customPrice ?? ""} {prices?.[0]?.currency ?? ""}
                        </Text>
                        <Text align="center">
                            <Icon icon="dot" size={1} />
                        </Text>
                        <Text as="del">
                            {offers?.[0]?.offerRunwayValue ?? ""}{" "}
                            {offers?.[0]?.offerRunwayUnit ? t(`units.${offers[0].offerRunwayUnit}`) : ""}
                        </Text>
                        <Text color="semanticInfoBasic">
                            {customOfferRunwayValue ?? ""}{" "}
                            {customOfferRunwayUnit ? t(`units.${customOfferRunwayUnit}`) : ""}
                        </Text>
                    </HStack>
                )}
                {isPlanSummaryDeletion ? null : (
                    <>
                        <Divider />
                        <Text>{customComments}</Text>
                    </>
                )}
                {withActions && <PlanSummarySidePanelItemActions {...props} />}
            </VStack>
        </Card>
    );
};
