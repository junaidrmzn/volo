import { useMemo, useState } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { PlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllFilters } from "./filter/useGetAllFilters";
import { useGetAllQuickFilters } from "./filter/useGetAllQuickFilters";
import { usePlanSummaryTranslation } from "./translations/usePlanSummaryTranslation";
import { usePlanSummaryPage } from "./usePlanSummaryPage";

export const usePlanSummaryMachineConfig = (planId: string, planName: string) => {
    const { t } = usePlanSummaryTranslation();
    const canRead = useIsAuthorizedTo(["read"], ["PlanSummary"]);
    const [isApprovedAll, setIsApprovedAll] = useState(false);
    const { getAllFilters } = useGetAllFilters();
    const { getAllQuickFilters } = useGetAllQuickFilters();
    const { fetchAllPlanSummaries } = usePlanSummaryPage(planId);

    const PAGE_SIZE = 10;

    const planSummaryMachineConfig = useMemo(() => {
        return new ResourceMachineConfigBuilder({
            canCreate: false,
            canRead,
            canUpdate: false,
            canDelete: false,
            getResourceName: () => t("overview.listLabel"),
        })
            .withList<PlanSummary>({
                fetchAllResources: fetchAllPlanSummaries,
                getListItemName: () => "list.listItemName",
                getListTitle: () => t("overview.Plan"),
                pageSize: PAGE_SIZE,
                getListAriaLabel: () => t("overview.listLabel"),
            })
            .withActionBar({ getResourceInfo: () => t("overview.information", { planName }) })
            .withFilterBar({ getAllFilters })
            .withQuickFilter({ getAllQuickFilters })
            .withSidePanel()
            .build();
    }, [canRead, fetchAllPlanSummaries, getAllFilters, getAllQuickFilters, planName, t]);

    return { planSummaryMachineConfig, isApprovedAll, setIsApprovedAll };
};
