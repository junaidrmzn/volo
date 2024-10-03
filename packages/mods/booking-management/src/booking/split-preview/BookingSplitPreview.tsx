import { Booking } from "@voloiq/booking-management-api/v1";
import { BookingDetail } from "./BookingDetail";
import { NoBookingSelected } from "./NoBookingSelected";

type BookingSplitPreviewProps = {
    booking?: Booking;
    reloadList: () => void;
};

export const BookingSplitPreview = (props: BookingSplitPreviewProps) => {
    const { booking, reloadList } = props;

    return booking ? <BookingDetail booking={booking} reloadList={reloadList} /> : <NoBookingSelected />;
};
