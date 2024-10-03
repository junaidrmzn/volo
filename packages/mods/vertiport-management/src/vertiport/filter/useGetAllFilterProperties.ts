import type { FilterProperty } from "@voloiq/resource-overview";
import { Region, StringPair } from "@voloiq/vertiport-management-api/v1";
import { useVertiportFilterTranslation } from "./translations/useVertiportFilterTranslation";

type UseGetAllFilterPropertiesProps = {
    regions: Region[];
    services: StringPair[];
};

export const useGetAllFilterProperties = () => {
    const { t } = useVertiportFilterTranslation();
    const getAllFilterProperties = (props: UseGetAllFilterPropertiesProps): FilterProperty[] => {
        const { regions, services } = props;
        return [
            {
                type: "text",
                propertyName: "name",
                label: t("filterPanel.name"),
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "iataCode",
                label: t("filterPanel.iataCode"),
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "icaoCode",
                label: t("filterPanel.icaoCode"),
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "code",
                label: t("filterPanel.code"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select-multiple",
                propertyName: "services",
                options: services?.map((service) => ({
                    label: service.key,
                    value: service.key,
                })),
                label: t("filterPanel.services"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select",
                propertyName: "region",
                options: regions?.map((region) => ({
                    label: region.name,
                    value: region.id,
                })),
                label: t("filterPanel.regionId"),
                group: t("filterPanel.filters"),
            },
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
            {
                type: "date-range",
                propertyName: "publicFrom",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.publicFrom"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
            {
                type: "date-range",
                propertyName: "publicTo",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.publicTo"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "leonId",
                label: t("filterPanel.leonId"),
                group: t("filterPanel.filters"),
                isNullable: true,
                nullLabel: t("filterPanel.nullLabel"),
            },
        ];
    };

    return { getAllFilterProperties };
};
