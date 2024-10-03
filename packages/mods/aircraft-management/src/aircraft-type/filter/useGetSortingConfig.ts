import type { SortingConfig } from "@voloiq/resource-overview";
import { useAircraftTypeFilterTranslation } from "./translations/useAircraftTypeFilterTranslation";

export const useGetSortingConfig = () => {
    const { t } = useAircraftTypeFilterTranslation();
    const getSortingConfig = (): SortingConfig => ({
        options: [
            {
                label: t("filterPanel.name"),
                value: "name",
            },
            {
                label: t("filterPanel.validFrom"),
                value: "validFrom",
            },
            {
                label: t("filterPanel.validTo"),
                value: "validTo",
            },
            {
                label: t("filterPanel.productLine.caption"),
                value: "productLine",
            },
        ],
    });

    return { getSortingConfig };
};
