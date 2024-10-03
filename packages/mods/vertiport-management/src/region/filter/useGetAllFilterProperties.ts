import type { FilterProperty } from "@voloiq/resource-overview";
import { useRegionFilterTranslation } from "./translations/useRegionFilterTranslation";

export const useGetAllFilterProperties = () => {
    const { t } = useRegionFilterTranslation();
    const getAllFilterProperties = (): FilterProperty[] => {
        return [
            {
                type: "date-range",
                propertyName: "validFrom",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.validFrom"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
            {
                type: "date-range",
                propertyName: "validTo",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.validTo"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
        ];
    };

    return { getAllFilterProperties };
};
