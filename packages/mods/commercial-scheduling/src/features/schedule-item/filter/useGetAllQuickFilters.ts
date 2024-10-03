import { useScheduleItemStatusTranslation } from "@voloiq/commercial-scheduling-utils";
import { QuickFilterProperty } from "@voloiq/resource-overview/";

export const useGetAllQuickFilters = () => {
    const { t } = useScheduleItemStatusTranslation();

    const getAllQuickFilters = (): QuickFilterProperty[] => {
        const propertyName = "status";

        return [
            { displayName: t("Draft"), propertyName, value: "DRAFT" },
            { displayName: t("Ordered"), propertyName, value: "ORDERED" },
            { displayName: t("Planned"), propertyName, value: "PLANNED" },
            { displayName: t("Offered"), propertyName, value: "OFFERED" },
            { displayName: t("Booked"), propertyName, value: "BOOKED" },
            { displayName: t("Cancelled"), propertyName, value: "CANCELLED" },
            { displayName: t("Closed"), propertyName, value: "CLOSED" },
        ];
    };

    return { getAllQuickFilters };
};
