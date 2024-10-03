import { FilterProperty } from "@voloiq/resource-overview";
import { useScheduleItemTranslation } from "../translations/useScheduleItemTranslation";

export const useGetAllFilters = () => {
    const { t } = useScheduleItemTranslation();

    const getAllFilters = (): FilterProperty[] => [
        {
            type: "text",
            propertyName: "aircraftTypeName",
            label: t("filterPanel.Aircraft Type"),
            group: t("filterPanel.Filters"),
        },
        {
            type: "text",
            propertyName: "arrivalVertiportCode",
            label: t("filterPanel.Arrival Vertiport"),
            group: t("filterPanel.Filters"),
        },
        {
            type: "date-range",
            propertyName: "departureTime",
            label: t("filterPanel.Departure Date"),
            group: t("filterPanel.Filters"),
            minLabel: t("filterPanel.from"),
            maxLabel: t("filterPanel.to"),
        },
        {
            type: "text",
            propertyName: "departureVertiportCode",
            label: t("filterPanel.Departure Vertiport"),
            group: t("filterPanel.Filters"),
        },
    ];

    return { getAllFilters };
};
