import { FilterProperty } from "@voloiq/resource-overview";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";

export const useGetAllFilters = () => {
    const { t } = usePlanSummaryTranslation();

    const getAllFilters = (): FilterProperty[] => [
        {
            type: "text",
            propertyName: "aircraftTypeName",
            label: t("overview.filterPanel.aircraftType"),
            group: t("overview.filterPanel.filters"),
        },
        {
            type: "text",
            propertyName: "arrivalVertiportCode",
            label: t("overview.filterPanel.arrivalVertiport"),
            group: t("overview.filterPanel.filters"),
        },
        {
            type: "date-range",
            propertyName: "departureTime",
            label: t("overview.filterPanel.departureDate"),
            group: t("overview.filterPanel.filters"),
            minLabel: t("overview.filterPanel.from"),
            maxLabel: t("overview.filterPanel.to"),
        },
        {
            type: "text",
            propertyName: "departureVertiportCode",
            label: t("overview.filterPanel.departureVertiport"),
            group: t("overview.filterPanel.filters"),
        },
    ];

    return { getAllFilters };
};
