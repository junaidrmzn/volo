import { QuickFilterProperty } from "@voloiq/resource-overview/";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";

export const useGetAllQuickFilters = () => {
    const { t } = usePlanSummaryTranslation();

    const getAllQuickFilters = (): QuickFilterProperty[] => {
        return [
            { displayName: t("overview.ChangeRequest"), propertyName: "isCustomized", value: "true" },
            { displayName: t("overview.invalid"), propertyName: "connectionStatus", value: "INCONSISTENT" },
        ];
    };

    return { getAllQuickFilters };
};
