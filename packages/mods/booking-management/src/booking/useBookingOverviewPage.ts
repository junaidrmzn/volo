import { useCallback } from "react";
import { BOOKING_BASE_URL, Booking, useGetBooking, useGetBookings } from "@voloiq/booking-management-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";

export const useBookingOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetBookings({ manual: true });
    const { refetchDataWithResponseEnvelope } = useGetBooking({ manual: true });

    const fetchAllBookings = useCallback(
        (options: FetchAllResourceOptions<Booking>) => {
            const { page, size, sortingConfiguration, filterSet } = options;

            const filters =
                filterSet && filterSet?.filters.length > 0 ? { filter: serializeFilters(filterSet) } : undefined;

            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...filters,
                    order: sortingConfiguration?.selectedOrder,
                    orderBy: sortingConfiguration?.selectedOption,
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    const fetchBooking = useCallback(
        (bookingId: string, booking?: Booking) => {
            return refetchDataWithResponseEnvelope({
                url: `${BOOKING_BASE_URL}/${bookingId}`,
                params: { regionId: booking?.regionId },
            });
        },
        [refetchDataWithResponseEnvelope]
    );

    return { fetchAllBookings, fetchBooking };
};
