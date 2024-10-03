import type { SortingConfig } from "@voloiq/resource-overview";
import { useRegionFilterTranslation } from "./translations/useRegionFilterTranslation";

export const useGetSortingConfig = () => {
    const { t } = useRegionFilterTranslation();
    const getSortingConfig = (): SortingConfig => ({
        options: [
            {
                label: t("filterPanel.name"),
                value: "name",
            },
        ],
    });

    return { getSortingConfig };
};
