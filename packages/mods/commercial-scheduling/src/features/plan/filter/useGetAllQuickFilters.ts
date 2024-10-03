import { usePlanStatusTranslation } from "@voloiq/commercial-scheduling-utils";
import { QuickFilterProperty } from "@voloiq/resource-overview/";
import { usePlanTranslation } from "../translations/usePlanTranslation";

export const useGetAllQuickFilters = () => {
    const { t } = usePlanTranslation();
    const { t: planStatusTranslation } = usePlanStatusTranslation();

    const getAllQuickFilters = (): QuickFilterProperty[] => {
        const propertyName = "status";

        return [
            { displayName: planStatusTranslation("Draft"), propertyName, value: "DRAFT" },
            { displayName: planStatusTranslation("Awaiting Approval"), propertyName, value: "AWAITING_APPROVAL" },
            { displayName: planStatusTranslation("Approved"), propertyName, value: "APPROVED" },
            { displayName: planStatusTranslation("Published"), propertyName, value: "PUBLISHED" },
            {
                displayName: t("overview.Archived"),
                propertyName: "isArchived",
                value: true,
            },
        ];
    };

    return { getAllQuickFilters };
};
