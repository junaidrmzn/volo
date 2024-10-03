import type { FilterProperty } from "@voloiq/resource-overview";
import { useAircraftTypeFilterTranslation } from "./translations/useAircraftTypeFilterTranslation";

export const useGetAllFilterProperties = () => {
    const { t } = useAircraftTypeFilterTranslation();
    const getAllFilterProperties = (): FilterProperty[] => {
        return [
            {
                type: "text",
                propertyName: "name",
                label: t("filterPanel.aircraftType"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select-multiple",
                propertyName: "productLine",
                options: [
                    {
                        label: t("filterPanel.productLine.volocity"),
                        value: "VOLOCITY",
                    },
                    {
                        label: t("filterPanel.productLine.volodrone"),
                        value: "VOLODRONE",
                    },
                    {
                        label: t("filterPanel.productLine.voloregion"),
                        value: "VOLOREGION",
                    },
                    {
                        label: t("filterPanel.productLine.2x"),
                        value: "2X",
                    },
                ],
                label: t("filterPanel.productLine.caption"),
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
                type: "number",
                propertyName: "passengerSeats",
                label: t("filterPanel.passengerSeatCount"),
                group: t("filterPanel.filters"),
            },
            {
                type: "number",
                propertyName: "aircraftCount",
                label: t("filterPanel.activeAircraftCount"),
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
