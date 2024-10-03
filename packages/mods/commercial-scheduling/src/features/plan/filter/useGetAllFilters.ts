import { Region } from "@voloiq/commercial-scheduling-api/v1";
import { FilterProperty } from "@voloiq/resource-overview";
import { usePlanTranslation } from "../translations/usePlanTranslation";

export const useGetAllFilters = () => {
    const { t } = usePlanTranslation();

    const getAllFilters = (regions: Region[]): FilterProperty[] => [
        {
            type: "select",
            label: t("overview.filterPanel.region"),
            propertyName: "regionId",
            options: regions.map((region) => ({ value: region.id, label: region.name })),
            group: t("overview.filterPanel.Filters"),
        },
    ];

    return { getAllFilters };
};
