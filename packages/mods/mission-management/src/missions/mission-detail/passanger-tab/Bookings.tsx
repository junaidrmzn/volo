import { Box, EmptyState } from "@volocopter/design-library-react";
import { MassAndBalanceConfigurationType } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { BookingDisplay } from "./BookingDisplay";

type BookingsProps = {
    mission: Mission;
};

export const Bookings = (props: BookingsProps) => {
    const { mission } = props;
    const { bookings, massAndBalanceConfigurations } = mission;
    const { t } = useMissionTranslations();

    const passangerWeight = massAndBalanceConfigurations?.filter(
        (mbConfig) => mbConfig.type === MassAndBalanceConfigurationType.TOM1
    );

    const passangerWeightInLimits =
        passangerWeight && passangerWeight[0]?.isWithinLimits
            ? t("passangerTab.status.exceeding")
            : t("passangerTab.status.checked");

    return (
        <Box width="100%">
            {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                    <BookingDisplay
                        key={booking.bookingId}
                        bookingLabel={booking?.bookingCode}
                        passangerWeight={passangerWeight}
                        passangerWeightInLimits={passangerWeightInLimits}
                        mission={mission}
                        bookingId={booking.bookingId}
                    />
                ))
            ) : (
                <EmptyState title={t("emptyState.title")} description={t("emptyState.description")} />
            )}
        </Box>
    );
};
