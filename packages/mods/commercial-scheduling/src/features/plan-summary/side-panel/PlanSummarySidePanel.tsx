import { HStack, Skeleton, Text, VStack } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useGetPlanSummaryCustomizationsQuery } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";
import { PlanSummaryApproveAll } from "./PlanSummaryApproveAll";
import { PlanSummarySidePanelItem } from "./PlanSummarySidePanelItem";

type PlanSummarySidePanelProps = {
    planId: string;
    reloadList: () => void;
    reloadPlan: () => void;
    setIsApprovedAll: (flag: boolean) => void;
};

export const PlanSummarySidePanel = (props: PlanSummarySidePanelProps) => {
    const { planId, reloadList, reloadPlan, setIsApprovedAll } = props;
    const { changeRequestItems, changeHistoryItems, isLoading, invalidateQuery } = useGetPlanSummaryCustomizationsQuery(
        planId ?? "-1"
    );
    const { t } = usePlanSummaryTranslation();

    const canApprove = useIsAuthorizedTo(["approve"], ["PlanSummaryCustomization"]);

    const canApproveAll =
        canApprove &&
        changeRequestItems.length > 0 &&
        changeRequestItems.every((item) => item.customItemStatus === "AWAITING_APPROVAL");
    setIsApprovedAll(!canApproveAll);

    const refetchData = () => {
        reloadList();
        invalidateQuery();
        reloadPlan();
        setIsApprovedAll(true);
    };

    return isLoading ? (
        <VStack alignItems="flex-start">
            <Skeleton width="100%" height="xs" isLoading />
            <Skeleton width="100%" height="xs" isLoading />
        </VStack>
    ) : (
        <VStack alignItems="flex-start">
            <HStack alignItems="flex-start" alignSelf="stretch" boxSize="full" justifyContent="space-between">
                <Text fontWeight="light">
                    {t("overview.sidePanel.changeRequests")} ({changeRequestItems.length})
                </Text>
                {canApproveAll && (
                    <PlanSummaryApproveAll
                        changeRequestItems={changeRequestItems}
                        planId={planId}
                        refetchData={refetchData}
                    />
                )}
            </HStack>
            <VStack aria-label={t("overview.sidePanel.changeRequests")} alignItems="flex-start" boxSize="full">
                {changeRequestItems.map((changeRequestItem) => (
                    <PlanSummarySidePanelItem
                        key={changeRequestItem.id}
                        planSummary={changeRequestItem}
                        refetchData={refetchData}
                        withActions
                    />
                ))}
            </VStack>
            <HStack alignItems="flex-start" alignSelf="stretch" boxSize="full" justifyContent="space-between">
                <Text fontWeight="light">
                    {t("overview.sidePanel.changeHistory")} ({changeHistoryItems.length})
                </Text>
            </HStack>
            <VStack aria-label={t("overview.sidePanel.changeHistory")} alignItems="flex-start" boxSize="full">
                {changeHistoryItems.map((changeHistoryItem) => (
                    <PlanSummarySidePanelItem
                        key={changeHistoryItem.id}
                        planSummary={changeHistoryItem}
                        refetchData={refetchData}
                        withActions={false}
                    />
                ))}
            </VStack>
        </VStack>
    );
};
