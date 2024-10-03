import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlanSummary } from "./apiModels";
import { useGetPlanSummaries } from "./useGetPlanSummaries";

const modifyData = (data?: PlanSummary[]): { changeRequestItems: PlanSummary[]; changeHistoryItems: PlanSummary[] } => {
    if (!data) return { changeRequestItems: [], changeHistoryItems: [] };

    const changeRequestItems = data.filter(
        (item) =>
            item.isCustomized && (item.customItemStatus === "DRAFT" || item.customItemStatus === "AWAITING_APPROVAL")
    );
    const changeHistoryItems = data.filter((item) => item.isCustomized && item.customItemStatus === "APPROVED");

    return { changeRequestItems, changeHistoryItems };
};

export const useGetPlanSummaryCustomizationsQuery = (planId: string) => {
    const { sendRequest } = useGetPlanSummaries(planId, {
        params: { page: 1, size: 100 },
        options: { manual: true },
    });
    const queryClient = useQueryClient();

    const queryKey = ["planSummaryCustomizedItems", planId];
    const PlanSummarysQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        select: modifyData,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const invalidateQuery = () => {
        queryClient.invalidateQueries(queryKey);
    };

    return {
        changeRequestItems: PlanSummarysQuery.data?.changeRequestItems || [],
        changeHistoryItems: PlanSummarysQuery.data?.changeHistoryItems || [],
        isLoading: PlanSummarysQuery.isLoading || PlanSummarysQuery.isFetching,
        invalidateQuery,
    };
};
