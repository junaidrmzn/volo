import type { FilterProperty } from "@voloiq/resource-overview";
import { useParameterFilterTranslation } from "./translations/useParameterFilterTranslation";

export const useGetAllFilterProperties = () => {
    const { t } = useParameterFilterTranslation();

    const getAllFilterProperties = (): FilterProperty[] => [
        {
            type: "text",
            propertyName: "name",
            label: t("FilterPanel.Name"),
            group: t("FilterPanel.Filters"),
        },
        {
            type: "text",
            propertyName: "unit",
            label: t("FilterPanel.Unit"),
            group: t("FilterPanel.Filters"),
        },
        {
            type: "text",
            propertyName: "acronym",
            label: t("FilterPanel.Acronym"),
            group: t("FilterPanel.Filters"),
        },
    ];

    return {
        getAllFilterProperties,
    };
};
