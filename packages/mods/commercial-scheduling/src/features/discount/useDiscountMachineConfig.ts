import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Discount, useGetRegionsQuery } from "@voloiq/commercial-scheduling-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllFilters } from "./filter/useGetAllFilters";
import { useGetAllQuickFilters } from "./filter/useGetAllQuickFilters";
import { useDiscountTranslation } from "./translations/useDiscountTranslation";
import { useDiscountOverviewPage } from "./useDiscountOverviewPage";

export const useDiscountMachineConfig = () => {
    const { t } = useDiscountTranslation();
    const canRead = useIsAuthorizedTo(["read"], ["CommercialPromotion"]);
    const { regions, isLoading } = useGetRegionsQuery();
    const { fetchAllDiscounts } = useDiscountOverviewPage();
    const { getAllFilters } = useGetAllFilters();
    const { getAllQuickFilters } = useGetAllQuickFilters();

    const PAGE_SIZE = 10;

    return useMemo(() => {
        if (isLoading) return { isLoading };

        const discountMachineConfig = new ResourceMachineConfigBuilder({
            canCreate: false,
            canRead,
            canUpdate: false,
            canDelete: false,
            getResourceName: () => t("overview.listLabel"),
        })
            .withList<Discount>({
                fetchAllResources: fetchAllDiscounts,
                getListItemName: () => "list.listItemName",
                getListTitle: () => t("overview.heading"),
                pageSize: PAGE_SIZE,
                getListAriaLabel: () => t("overview.listLabel"),
            })
            .withActionBar({ getResourceInfo: () => t("overview.information") })
            .withFilterBar({ getAllFilters: () => getAllFilters(regions) })
            .withQuickFilter({ getAllQuickFilters })
            .build();

        return { discountMachineConfig };
    }, [canRead, fetchAllDiscounts, getAllFilters, getAllQuickFilters, isLoading, regions, t]);
};
