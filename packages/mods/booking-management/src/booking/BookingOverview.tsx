import { CardListItemProps } from "@volocopter/design-library-react";
import { Booking } from "@voloiq/booking-management-api/v1";
import { LoadingPage } from "@voloiq/booking-management-components";
import { RenderSplitPreviewOptions, ResourceOverview } from "@voloiq/resource-overview";
import { BookingListItem } from "./list/BookingListItem";
import { BookingSplitPreview } from "./split-preview/BookingSplitPreview";
import { useBookingMachineConfig } from "./useBookingMachineConfig";

export const BookingOverview = () => {
    const { bookingMachineConfig, isLoading } = useBookingMachineConfig();

    if (isLoading) return <LoadingPage />;
    return (
        <ResourceOverview<Booking> machineConfig={bookingMachineConfig}>
            <ResourceOverview.ListItem>
                {(booking: Booking, cardListItemProps: CardListItemProps) => (
                    <BookingListItem booking={booking} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.SplitPreview>
                {(booking: Booking, options: RenderSplitPreviewOptions) => (
                    <BookingSplitPreview booking={booking} {...options} />
                )}
            </ResourceOverview.SplitPreview>
        </ResourceOverview>
    );
};
