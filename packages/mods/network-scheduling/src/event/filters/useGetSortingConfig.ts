import type { SortingConfig } from "@voloiq/resource-overview";
import { useEventFilterTranslation } from "./translations/useEventFilterTranslation";

export const useGetSortingConfig = () => {
    const { t } = useEventFilterTranslation();
    const getSortingConfig = (): SortingConfig => ({
        options: [
            {
                label: t("filterPanel.name"),
                value: "name",
            },
            {
                label: t("filterPanel.startDate"),
                value: "startDate",
            },
            {
                label: t("filterPanel.description"),
                value: "description",
            },
            {
                label: t("filterPanel.blockedForMission.caption"),
                value: "isBlockedForMission",
            },
        ],
    });

    return { getSortingConfig };
};
