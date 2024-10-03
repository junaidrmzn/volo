import { Card, Flex, HStack, Radio, Tag, Text, VStack } from "@volocopter/design-library-react";
import type { CrewMemberWithReservations } from "@voloiq-typescript-api/crew-api-types";
import { ReservationTimeGrid } from "@voloiq/network-scheduling-components";
import { SynchronizedWithLeonTag } from "../../../SynchronizedWithLeonTag";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { getPilotName } from "../../getPilotName";

export type PilotCardProps = {
    pilot: CrewMemberWithReservations;
    startDate: Date;
    endDate: Date;
    reservationSlotStartDate: string;
    reservationSlotEndDate: string;
    synchronizedWithLeon: boolean;
};

export const PilotCard = (props: PilotCardProps) => {
    const { pilot, startDate, endDate, reservationSlotEndDate, reservationSlotStartDate, synchronizedWithLeon } = props;
    const { id, firstName, surName, middleName, email, available, flightHours, reservations } = pilot;
    const { t } = useMissionTranslations();
    const availabilityStatus = available ? t("available") : t("unavailable");
    const pilotName = {
        pilotFirstName: firstName,
        pilotMiddleName: middleName,
        pilotSurName: surName,
    };
    return (
        <Card px={2} py={2} my={3}>
            <Flex borderRadius="sm">
                <HStack width="50%" alignItems="flex-start">
                    <Radio value={id} size="sm" aria-label={`pilot-${id}`} />
                    <VStack spacing={0} alignItems="flex-start">
                        <HStack>
                            <Text fontSize="sm" lineHeight={6}>
                                {getPilotName(pilotName)}
                            </Text>
                            {synchronizedWithLeon && <SynchronizedWithLeonTag />}
                        </HStack>
                        <Text fontSize="sm" lineHeight={6}>
                            {email}
                        </Text>
                    </VStack>
                </HStack>
                <HStack alignItems="flex-end" width="50%" justifyContent="flex-end">
                    <VStack spacing={0} alignItems="flex-end">
                        <Tag colorScheme="blue">
                            <Tag.Label variant="light">{availabilityStatus}</Tag.Label>
                        </Tag>
                        <Text fontSize="sm" lineHeight={6}>
                            {t("crewAssignment.reservedTime", { time: flightHours })}
                        </Text>
                    </VStack>
                </HStack>
            </Flex>
            <VStack py="4">
                <ReservationTimeGrid
                    startDate={startDate}
                    endDate={endDate}
                    reservedSlots={reservations}
                    reservationSlotStartDate={reservationSlotStartDate}
                    reservationSlotEndDate={reservationSlotEndDate}
                />
            </VStack>
        </Card>
    );
};
