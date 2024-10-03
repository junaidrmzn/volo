import { usePromotionStatusTranslation } from "@voloiq/commercial-scheduling-utils";
import { QuickFilterProperty } from "@voloiq/resource-overview";
import { useDiscountTranslation } from "../translations/useDiscountTranslation";

export const useGetAllQuickFilters = () => {
    const { t } = useDiscountTranslation();
    const { t: promotionStatusTranslation } = usePromotionStatusTranslation();

    const getAllQuickFilters = (): QuickFilterProperty[] => {
        const propertyName = "status";

        return [
            { displayName: promotionStatusTranslation("Draft"), propertyName, value: "DRAFT" },
            { displayName: promotionStatusTranslation("Published"), propertyName, value: "PUBLISHED" },
            {
                displayName: t("overview.filterPanel.archived"),
                propertyName: "isArchived",
                value: true,
            },
        ];
    };

    return { getAllQuickFilters };
};
