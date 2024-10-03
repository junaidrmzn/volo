import type { FilterProperty } from "@voloiq/resource-overview";
import { useCrewRoleFilterTranslation } from "./translations/useCrewRoleFilterTranslation";

export const useGetAllFilterProperties = () => {
    const { t } = useCrewRoleFilterTranslation();
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
