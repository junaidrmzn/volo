import { usePromotionItemStatusTranslation } from "@voloiq/commercial-scheduling-utils";
import { QuickFilterProperty } from "@voloiq/resource-overview/";

export const useGetAllQuickFilters = () => {
    const { t: planStatusTranslation } = usePromotionItemStatusTranslation();

    const getAllQuickFilters = (): QuickFilterProperty[] => {
        const propertyName = "status";

        return [
            { displayName: planStatusTranslation("Created"), propertyName, value: "CREATED" },
            { displayName: planStatusTranslation("Claimed"), propertyName, value: "CLAIMED" },
            { displayName: planStatusTranslation("Redeemed"), propertyName, value: "REDEEMED" },
            { displayName: planStatusTranslation("Invalidated"), propertyName, value: "INVALIDATED" },
        ];
    };

    return { getAllQuickFilters };
};
