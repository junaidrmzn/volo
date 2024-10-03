import { useState } from "react";
import { Booking, CancelBookingReason, useDeleteBooking } from "@voloiq/booking-management-api/v1";

type UseCancelBookingOptions = {
    booking: Booking;
    onSuccess: () => void;
};

export const useCancelBooking = (options: UseCancelBookingOptions) => {
    const { booking, onSuccess } = options;
    const { id } = booking;
    const [cancelBookingReason, setCancelBookingReason] = useState<CancelBookingReason>("CUSTOMER");

    const { sendRequestById } = useDeleteBooking();

    const cancelBooking = () => {
        sendRequestById(id, {
            body: { cancelledBy: cancelBookingReason },
        }).then(() => {
            onSuccess();
        });
    };
    return { cancelBookingReason, setCancelBookingReason, cancelBooking };
};
