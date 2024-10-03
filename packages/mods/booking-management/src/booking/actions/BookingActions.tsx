import { Button, ButtonGroup } from "@volocopter/design-library-react";
import { Booking } from "@voloiq/booking-management-api/v1";
import { useBookingTranslation } from "../translations/useBookingTranslation";
import { CancelBooking } from "./cancel-booking/CancelBooking";

type BookingActionsProps = { booking: Booking; reloadList: () => void };

export const BookingActions = (props: BookingActionsProps) => {
    const { t } = useBookingTranslation();

    return (
        <ButtonGroup>
            <Button isDisabled variant="secondary">
                {t("overview.detail.resendEmailToPassenger")}
            </Button>
            <Button isDisabled variant="secondary">
                {t("overview.detail.initiateRefund")}
            </Button>
            <CancelBooking {...props} />
        </ButtonGroup>
    );
};
