import { Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { Mission, useGetAllCrewFlightTimeLimitation } from "@voloiq/network-schedule-management-api/v1";
import { DataTable } from "../components/DataTable";
import { voloIQLogo } from "../resources";

type FlightManifestProps = {
    mission: Mission;
};

const formatDuration = (duration: number) => {
    const days = Math.floor(duration / (24 * 60 * 60));
    const hours = Math.floor((duration % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    let formattedDuration = "";
    if (days > 0) formattedDuration += `${days}d `;
    if (hours > 0) formattedDuration += `${hours}h `;
    if (minutes > 0) formattedDuration += `${minutes}m`;
    return formattedDuration.trim();
};

export const FlightManifest = (props: FlightManifestProps) => {
    const { mission } = props;
    const { estimatedDepartureDateTime, assignments, estimatedArrivalDateTime, arrivalDateTime } = mission;
    const { data: pilotData } = useGetAllCrewFlightTimeLimitation(
        assignments?.pilotId || "-1",
        estimatedDepartureDateTime ?? new Date().toISOString()
    );

    const { formatTime, formatDateTime } = useFormatDateTime();

    const missionTimeDifference = estimatedArrivalDateTime
        ? Math.abs((new Date(arrivalDateTime).getTime() - new Date(estimatedArrivalDateTime).getTime()) / (1000 * 60))
        : 0;

    return (
        <VStack justifyContent="space-between" height="100%">
            <Box>
                <HStack justifyContent="space-between" mb={10}>
                    <Box>
                        <Text fontSize="md" fontWeight="bold">
                            Flight Manifest
                        </Text>
                        <Text fontSize="xs">Trip No. 01</Text>
                    </Box>
                    <img src={voloIQLogo} alt="logo" style={{ width: 200 }} />
                </HStack>
                <DataTable
                    data={[
                        {
                            pilot: `${assignments?.pilotFirstName} ${assignments?.pilotSurName}` ?? "N/A",
                            aircraft: assignments?.aircraftRegistration ?? "N/A",
                            crewMember: assignments?.crewMemberAssignments?.length
                                ? assignments?.crewMemberAssignments
                                      ?.map((crew) => `${crew.firstName} ${crew.surName}`)
                                      .join(", ")
                                : "N/A",
                        },
                    ]}
                    headers={[
                        {
                            key: "pilot",
                            name: "Pilot",
                        },
                        {
                            key: "aircraft",
                            name: "Aricraft",
                        },
                        {
                            key: "crewMember",
                            name: "Crew Member",
                        },
                    ]}
                />

                <Text my={5} textAlign="center" fontWeight="bold">
                    On Duty Pilot
                </Text>

                {pilotData && (
                    <DataTable
                        data={[
                            {
                                reportOn: {
                                    value: `Rest: ${formatDuration(pilotData?.restBefore ?? 0)}`,
                                    colSpan: 3,
                                    backgroundColor: "lightblue",
                                },
                            },
                            ...(pilotData?.missions?.length
                                ? pilotData?.missions.map((mission) => {
                                      const {
                                          reportOn,
                                          reportOff,
                                          departureVertiportCode,
                                          arrivalVertiportCode,
                                          estimatedArrival,
                                          estimatedDeparture,
                                      } = mission;
                                      return {
                                          reportOn: formatTime(reportOn),
                                          reportOff: formatTime(reportOff),
                                          schedule: `${departureVertiportCode} - ${arrivalVertiportCode} . ${formatTime(
                                              estimatedDeparture
                                          )} - ${formatTime(estimatedArrival)}`,
                                      };
                                  })
                                : []),
                            {
                                reportOn: {
                                    value: `Rest: ${formatDuration(pilotData?.restAfter ?? 0)}`,
                                    colSpan: 3,
                                    backgroundColor: "lightblue",
                                },
                            },
                        ]}
                        headers={[
                            {
                                key: "reportOn",
                                name: "Report On",
                            },
                            {
                                key: "schedule",
                                name: "Schedule",
                            },
                            {
                                key: "reportOff",
                                name: "Report Off",
                            },
                        ]}
                    />
                )}

                <Text my={5} textAlign="center" fontWeight="bold">
                    Flight Schedule
                </Text>

                <DataTable
                    data={[
                        {
                            flightNumber: mission.flightNumber ?? "N/A",
                            departureTime: estimatedDepartureDateTime
                                ? formatDateTime(estimatedDepartureDateTime)
                                : "N/A",
                            departureVertiport: mission.departureVertiportCode ?? "N/A",
                            arrivalVertiport: mission.arrivalVertiportCode ?? "N/A",
                            arrivalTime: estimatedArrivalDateTime ? formatDateTime(estimatedArrivalDateTime) : "N/A",
                            status:
                                missionTimeDifference <= 10
                                    ? "on time"
                                    : estimatedArrivalDateTime && estimatedArrivalDateTime < arrivalDateTime
                                    ? "early"
                                    : "delayed",
                        },
                    ]}
                    headers={[
                        {
                            key: "flightNumber",
                            name: "Flight Number",
                        },
                        {
                            key: "departureTime",
                            name: "Departure Time",
                        },
                        {
                            key: "departureVertiport",
                            name: "Departure Vertiport",
                        },
                        {
                            key: "arrivalVertiport",
                            name: "Arrival Vertiport",
                        },
                        {
                            key: "arrivalTime",
                            name: "Arrival Time",
                        },
                        {
                            key: "status",
                            name: "Status",
                        },
                    ]}
                />
            </Box>
            <Box width="100%">
                <Text mb={10}>PIC Signature</Text>
                <Box width={60} borderWidth={1} borderColor="#d1d1d1" />
            </Box>
        </VStack>
    );
};
