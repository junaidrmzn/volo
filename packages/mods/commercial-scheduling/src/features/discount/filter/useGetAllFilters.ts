import { Region } from "@voloiq/commercial-scheduling-api/v1";
import { FilterProperty } from "@voloiq/resource-overview";
import { useDiscountTranslation } from "../translations/useDiscountTranslation";

export const useGetAllFilters = () => {
    const { t } = useDiscountTranslation();

    const getAllFilters = (regions: Region[]): FilterProperty[] => [
        {
            type: "select",
            label: t("overview.filterPanel.region"),
            propertyName: "regionId",
            options: regions.map((region) => ({ value: region.id, label: region.name })),
            group: t("overview.filterPanel.filters"),
        },
    ];

    return { getAllFilters };
};
