import type { SortingConfig } from "@voloiq/resource-overview";
import { useAircraftFilterTranslation } from "./translations/useAircraftFilterTranslation";

export const useGetSortingConfig = () => {
    const { t } = useAircraftFilterTranslation();
    const getSortingConfig = (): SortingConfig => ({
        options: [
            {
                label: t("filterPanel.registration"),
                value: "registration",
            },
            {
                label: t("filterPanel.msn"),
                value: "msn",
            },
            {
                label: t("filterPanel.service.caption"),
                value: "services",
            },
            {
                label: t("filterPanel.technicalStatus.caption"),
                value: "technicalStatus",
            },
            {
                label: t("filterPanel.crewConfiguration.caption"),
                value: "crewConfiguration",
            },
            {
                label: t("filterPanel.validFrom"),
                value: "validFrom",
            },
            {
                label: t("filterPanel.validTo"),
                value: "validTo",
            },
        ],
    });

    return { getSortingConfig };
};
