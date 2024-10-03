import type { SortingConfig } from "@voloiq/resource-overview";
import { useCrewMemberFilterTranslation } from "./translations/useCrewMemberFilterTranslation";

export const useGetSortingConfig = () => {
    const { t } = useCrewMemberFilterTranslation();
    const getSortingConfig = (): SortingConfig => ({
        options: [
            {
                label: t("filterPanel.surName"),
                value: "surName",
            },
            {
                label: t("filterPanel.firstName"),
                value: "firstName",
            },
            {
                label: t("filterPanel.homeBase"),
                value: "homeBase",
            },
        ],
    });

    return { getSortingConfig };
};
