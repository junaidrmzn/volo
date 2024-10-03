import { HStack, Text } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { InfoCard, Section } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type BookingsProps = {
    mission: Mission;
};

export const Bookings = (props: BookingsProps) => {
    const { mission } = props;
    const { bookings } = mission;
    const { t } = useMissionTranslations();
    return (
        <Section
            headerLabel={t("Bookings")}
            bodyContent={
                <HStack width="100%" alignItems="flex-start">
                    <InfoCard
                        headerLabel={t("Passenger")}
                        bodyContent={
                            <Text fontSize="xs">
                                {bookings && bookings.length > 0
                                    ? Object.values(bookings)
                                          .map((booking) => {
                                              return booking.bookingCode;
                                          })
                                          .join(", ")
                                    : t("noBookings")}
                            </Text>
                        }
                    />
                </HStack>
            }
        />
    );
};
