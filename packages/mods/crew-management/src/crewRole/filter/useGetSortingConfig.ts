import type { SortingConfig } from "@voloiq/resource-overview";
import { useCrewRoleFilterTranslation } from "./translations/useCrewRoleFilterTranslation";

export const useGetSortingConfig = () => {
    const { t } = useCrewRoleFilterTranslation();
    const getSortingConfig = (): SortingConfig => ({
        options: [
            {
                label: t("filterPanel.roleKey"),
                value: "roleKey",
            },
        ],
    });

    return { getSortingConfig };
};
