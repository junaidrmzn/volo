import { Card, Flex, HStack, Radio, Tag, Text, VStack } from "@volocopter/design-library-react";
import { TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { Aircraft } from "@voloiq/network-schedule-management-api/v1";
import { ReservationTimeGrid } from "@voloiq/network-scheduling-components";
import { SynchronizedWithLeonTag } from "../../../SynchronizedWithLeonTag";

export type AircraftCardProps = {
    aircraft: Aircraft;
    startDate: Date;
    endDate: Date;
    reservationSlotStartDate: string;
    reservationSlotEndDate: string;
};

export const AircraftCard = (props: AircraftCardProps) => {
    const { aircraft, startDate, endDate, reservationSlotEndDate, reservationSlotStartDate } = props;
    const { aircraftId, msn, aircraftTypeName, registration, technicalStatus, reservations, synchronizedWithLeon } =
        aircraft;

    return (
        <Card px={2} py={2} my={3}>
            <Flex borderRadius="sm">
                <HStack width="50%" alignItems="flex-start">
                    <Radio value={aircraftId} size="sm" aria-label={`aircraft-${aircraftId}`} />
                    <VStack spacing={0} alignItems="flex-start">
                        <HStack>
                            <Text fontSize="sm" lineHeight={6}>
                                {aircraftTypeName}
                            </Text>
                            {synchronizedWithLeon && <SynchronizedWithLeonTag />}
                        </HStack>
                        <Text fontSize="sm" lineHeight={6}>
                            {msn}
                            {registration ? `, ${registration}` : ""}
                        </Text>
                    </VStack>
                </HStack>
                <VStack spacing={0} alignItems="flex-end" width="50%">
                    <Tag colorScheme={technicalStatus === TechnicalStatus.SERVICEABLE ? "blue" : "error-subtle"}>
                        <Tag.Label variant="light">{technicalStatus}</Tag.Label>
                    </Tag>
                </VStack>
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
