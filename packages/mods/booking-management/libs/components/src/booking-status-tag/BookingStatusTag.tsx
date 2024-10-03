import { Tag } from "@volocopter/design-library-react";
import { BookingStatus } from "@voloiq/booking-management-api/v1";
import { useBookingStatus } from "@voloiq/booking-management-utils";

export type BookingStatusTagProps = {
    status: BookingStatus;
};
export const BookingStatusTag = (props: BookingStatusTagProps) => {
    const { status } = props;

    const { text, variant } = useBookingStatus({ status });

    return text ? <Tag colorScheme={variant}>{text}</Tag> : null;
};
