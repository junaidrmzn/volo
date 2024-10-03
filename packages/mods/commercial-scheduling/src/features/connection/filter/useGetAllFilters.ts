import { Region } from "@voloiq/commercial-scheduling-api/v1";
import { FilterProperty } from "@voloiq/resource-overview";
import { useConnectionTranslation } from "../translations/useConnectionTranslation";

export const useGetAllFilters = () => {
    const { t } = useConnectionTranslation();

    const getAllFilters = (regions: Region[]): FilterProperty[] => [
        {
            type: "text",
            propertyName: "name",
            label: t("model.name"),
            group: t("generic.filter button"),
        },
        {
            type: "text",
            propertyName: "title",
            label: t("model.title"),
            group: t("generic.filter button"),
        },
        {
            type: "text",
            propertyName: "subtitle",
            label: t("model.subtitle"),
            group: t("generic.filter button"),
        },
        {
            type: "select",
            propertyName: "regionId",
            label: t("model.region"),
            options: regions.map((region) => ({ label: region.name, value: region.id })),
            group: t("generic.filter button"),
        },
        {
            type: "date-range",
            propertyName: "valid",
            minLabel: t("model.validFrom"),
            maxLabel: t("model.validTo"),
            label: t("details.valid"),
            group: t("generic.filter button"),
        },
    ];

    return { getAllFilters };
};
