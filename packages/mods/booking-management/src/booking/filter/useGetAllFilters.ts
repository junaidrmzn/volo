import { Connection, Region } from "@voloiq/booking-management-api/v1";
import { useBookingStatusTranslation } from "@voloiq/booking-management-utils";
import { FilterProperty } from "@voloiq/resource-overview";
import { useBookingTranslation } from "../translations/useBookingTranslation";

export const useGetAllFilters = () => {
    const { t } = useBookingTranslation();
    const { t: tBookingStatus } = useBookingStatusTranslation();

    const getAllFilters = (regions: Region[], connections: Connection[]): FilterProperty[] => [
        {
            type: "select",
            label: t("overview.filterPanel.region"),
            propertyName: "regionId",
            options: regions.map((region) => ({ value: region.id, label: region.name })),
            group: t("overview.filterPanel.Filters"),
        },
        {
            type: "date-range",
            label: t("overview.filterPanel.bookingDate"),
            propertyName: "bookingDateTime",
            minLabel: t("generic.from"),
            maxLabel: t("generic.to"),
            group: t("overview.filterPanel.Filters"),
        },
        {
            type: "date-range",
            label: t("overview.filterPanel.departureDateTime"),
            propertyName: "departureDateTime",
            minLabel: t("generic.from"),
            maxLabel: t("generic.to"),
            group: t("overview.filterPanel.Filters"),
        },
        {
            type: "select",
            label: t("overview.filterPanel.status"),
            propertyName: "bookingStatus",
            group: t("overview.filterPanel.Filters"),
            options: [
                { label: tBookingStatus("valid"), value: "VALID" },
                { label: tBookingStatus("reserved"), value: "RESERVED" },
                { label: tBookingStatus("cancelled"), value: "CANCELLED" },
            ],
        },
        {
            type: "select",
            label: t("overview.filterPanel.connection"),
            propertyName: "connectionId",
            group: t("overview.filterPanel.Filters"),
            options: connections.map((connection) => ({ label: connection.name, value: connection.id })),
        },
        {
            type: "text",
            label: t("overview.filterPanel.bookingCode"),
            propertyName: "bookingCode",
            group: t("overview.filterPanel.Filters"),
        },
    ];

    return { getAllFilters };
};
