import type { SortingConfig } from "@voloiq/resource-overview";
import { useVertiportFilterTranslation } from "./translations/useVertiportFilterTranslation";

export const useGetSortingConfig = () => {
    const { t } = useVertiportFilterTranslation();
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
                label: t("filterPanel.publicFrom"),
                value: "publicFrom",
            },
            {
                label: t("filterPanel.publicTo"),
                value: "publicTo",
            },
            {
                label: t("filterPanel.updateTime"),
                value: "updateTime",
            },
            {
                label: t("filterPanel.regionName"),
                value: "region",
            },
        ],
    });

    return { getSortingConfig };
};
