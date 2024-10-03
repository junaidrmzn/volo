import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { PromotionItem } from "@voloiq/commercial-scheduling-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { usePromotionItemTranslation } from "../translations/usePromotionItemTranslation";
import { useGetAllQuickFilters } from "./filter/useGetAllQuickFilters";
import { usePromotionItemList } from "./usePromotionItemList";

type PromotionItemMachineConfigOptions = {
    promotionId: string;
};

export const usePromotionItemMachineConfig = (options: PromotionItemMachineConfigOptions) => {
    const { promotionId } = options;
    const { t } = usePromotionItemTranslation();
    const canRead = useIsAuthorizedTo(["read"], ["CommercialPromotion"]);
    const { fetchPromotionItem } = usePromotionItemList(promotionId);
    const { getAllQuickFilters } = useGetAllQuickFilters();

    const PAGE_SIZE = 10;

    return useMemo(() => {
        const promotionItemDetailMachineConfig = new ResourceMachineConfigBuilder({
            canCreate: false,
            canRead,
            canUpdate: false,
            canDelete: false,
            getResourceName: () => t("promotionItem.listLabel"),
        })
            .withList<PromotionItem>({
                fetchAllResources: fetchPromotionItem,
                getListItemName: () => "list.listItemName",
                getListTitle: () => t("promotionItem.listLabel"),
                pageSize: PAGE_SIZE,
                getListAriaLabel: () => t("promotionItem.listLabel"),
                useTable: true,
                getTableColumns: () => [
                    t("promotionItem.columns.status"),
                    t("promotionItem.columns.codeNumber"),
                    t("promotionItem.columns.customer"),
                    t("promotionItem.columns.emailAddress"),
                    t("promotionItem.columns.bookingId"),
                    t("promotionItem.columns.action"),
                ],
            })
            .withQuickFilter({ getAllQuickFilters })
            .build();

        return { promotionItemDetailMachineConfig };
    }, [canRead, fetchPromotionItem, getAllQuickFilters, t]);
};
