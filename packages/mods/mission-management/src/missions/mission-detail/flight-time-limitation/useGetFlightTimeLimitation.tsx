import { HStack, Text, VStack } from "@volocopter/design-library-react";
import { useMemo } from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { Mission, useGetAllCrewFlightTimeLimitation } from "@voloiq/network-schedule-management-api/v1";

type FlightTimeLimitationTypes = {
    mission: Mission;
};

export const useGetFlightTimeLimitation = (props: FlightTimeLimitationTypes) => {
    const { mission } = props;
    const { assignments, estimatedDepartureDateTime } = mission;
    const { formatTime } = useFormatDateTime();
    const { data: pilotData, state } = useGetAllCrewFlightTimeLimitation(
        assignments?.pilotId || "-1",
        estimatedDepartureDateTime ?? new Date().toISOString()
    );

    const tableData = useMemo(() => {
        const rows = pilotData?.missions?.map((pilot) => {
            return {
                reportOn: (
                    <VStack justifyContent="space-between" align="flex-start">
                        {pilot?.estimatedDeparture && (
                            <Text fontSize="sm" fontWeight="normal" lineHeight={6}>
                                {formatTime(pilot?.reportOn)}
                            </Text>
                        )}
                    </VStack>
                ),
                schedule: (
                    <VStack justifyContent="space-between" align="flex-start">
                        <HStack justifyContent="flex-start" align="flex-start">
                            <Text fontSize="sm" fontWeight="normal" lineHeight={6}>
                                {`${pilot.departureVertiportCode} - ${pilot.arrivalVertiportCode}`}
                            </Text>

                            <Text fontSize="sm" fontWeight="normal" lineHeight={6}>
                                {` . ${formatTime(pilot.estimatedDeparture)} - ${formatTime(pilot.estimatedArrival)}`}
                            </Text>
                        </HStack>
                        <Text fontSize="xx-small" fontWeight="normal" lineHeight={4}>
                            Cockpit Count:1
                        </Text>
                    </VStack>
                ),
                reportOff: (
                    <VStack justifyContent="space-between" align="flex-start">
                        {pilot.estimatedArrival && (
                            <Text fontSize="sm" fontWeight="normal" lineHeight={6}>
                                {formatTime(pilot?.reportOff)}
                            </Text>
                        )}
                    </VStack>
                ),
            };
        });
        if (rows) return rows;

        return [
            {
                reportOn: <></>,
                schedule: <></>,
                reportOff: <></>,
            },
        ];
    }, [formatTime, pilotData]);

    return { tableData, pilotData, state };
};
