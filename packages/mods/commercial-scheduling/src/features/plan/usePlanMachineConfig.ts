import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Plan, useGetRegionsQuery } from "@voloiq/commercial-scheduling-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllFilters } from "./filter/useGetAllFilters";
import { useGetAllQuickFilters } from "./filter/useGetAllQuickFilters";
import { usePlanTranslation } from "./translations/usePlanTranslation";
import { usePlanOverviewPage } from "./usePlanOverviewPage";

export const usePlanMachineConfig = () => {
    const { t } = usePlanTranslation();
    const canRead = useIsAuthorizedTo(["read"], ["CommercialPlan"]);
    const { regions, isLoading } = useGetRegionsQuery();
    const { getAllFilters } = useGetAllFilters();
    const { getAllQuickFilters } = useGetAllQuickFilters();
    const { fetchAllPlans } = usePlanOverviewPage();

    const PAGE_SIZE = 10;

    return useMemo(() => {
        if (isLoading) return { isLoading };

        const planMachineConfig = new ResourceMachineConfigBuilder({
            canCreate: false,
            canRead,
            canUpdate: false,
            canDelete: false,
            getResourceName: () => t("overview.listLabel"),
        })
            .withList<Plan>({
                fetchAllResources: fetchAllPlans,
                getListItemName: () => "list.listItemName",
                getListTitle: () => t("overview.subheading"),
                getModuleTitle: () => t("overview.heading"),
                pageSize: PAGE_SIZE,
                getListAriaLabel: () => t("overview.listLabel"),
            })
            .withActionBar({ getResourceInfo: () => t("overview.information") })
            .withFilterBar({ getAllFilters: () => getAllFilters(regions) })
            .withQuickFilter({ getAllQuickFilters })
            .build();

        return { planMachineConfig, isLoading };
    }, [canRead, fetchAllPlans, getAllFilters, getAllQuickFilters, isLoading, regions, t]);
};
