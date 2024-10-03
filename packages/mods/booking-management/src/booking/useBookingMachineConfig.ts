import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Booking, useGetConnectionsQuery, useGetRegionsQuery } from "@voloiq/booking-management-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllFilters } from "./filter/useGetAllFilters";
import { useBookingTranslation } from "./translations/useBookingTranslation";
import { useBookingOverviewPage } from "./useBookingOverviewPage";

export const useBookingMachineConfig = () => {
    const { t } = useBookingTranslation();
    const canRead = useIsAuthorizedTo(["read"], ["BookingManagement"]);
    const { regions, isLoading: isRegionsLoading } = useGetRegionsQuery();
    const { connections, isLoading: isConnectionsLoading } = useGetConnectionsQuery();
    const { getAllFilters } = useGetAllFilters();
    const { fetchAllBookings, fetchBooking } = useBookingOverviewPage();

    const PAGE_SIZE = 10;

    return useMemo(() => {
        if (isRegionsLoading || isConnectionsLoading) return { isLoading: true };

        const bookingMachineConfig = new ResourceMachineConfigBuilder({
            canCreate: false,
            canRead,
            canUpdate: false,
            canDelete: false,
            getResourceName: () => t("overview.listLabel"),
        })
            .withList<Booking>({
                fetchAllResources: fetchAllBookings,
                getListItemName: () => "list.listItemName",
                getListTitle: () => t("overview.subheading"),
                getModuleTitle: () => t("overview.heading"),
                pageSize: PAGE_SIZE,
                getListAriaLabel: () => t("overview.listLabel"),
            })
            .withFilterBar({ getAllFilters: () => getAllFilters(regions, connections) })
            .withSplitPreview<Booking>({ fetchResource: fetchBooking })
            .build();

        return { bookingMachineConfig, isLoading: false };
    }, [
        isRegionsLoading,
        isConnectionsLoading,
        canRead,
        fetchAllBookings,
        fetchBooking,
        t,
        getAllFilters,
        regions,
        connections,
    ]);
};
