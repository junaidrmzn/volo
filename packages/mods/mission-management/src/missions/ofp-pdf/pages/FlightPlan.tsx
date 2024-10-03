import { Box, Text } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { FederatedMapRoute } from "@voloiq/network-scheduling-components";
import { DataTable, TableColumnsType } from "../components/DataTable";

type FlightPlanProps = {
    mission: Mission;
};

const secondsToTimeString = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const roundToTwoDigits = (number: number): number => {
    return Math.round(number * 100) / 100;
};

const metersToKilometers = (meters: number) => roundToTwoDigits(meters / 1000);

export const FlightPlan = (props: FlightPlanProps) => {
    const { mission } = props;
    const routeOption = mission.assignments?.routeOption;

    const getRoutes = () => {
        const routes: TableColumnsType = [];
        if (routeOption?.routes) {
            for (const route of routeOption?.routes) {
                const { id, waypoints } = route;
                const firstWaypoint = waypoints.at(0);
                const lastWaypoint = waypoints.at(-1);
                const firstWaypointValidationResult = firstWaypoint?.validationResult;
                const lastWaypointValidationResult = lastWaypoint?.validationResult;
                if (firstWaypointValidationResult && lastWaypointValidationResult && route.status === "valid") {
                    routes.push(
                        {
                            totalDistance: metersToKilometers(
                                firstWaypointValidationResult.remainingDistance3d
                            ).toString(),
                            totalTime: secondsToTimeString(lastWaypointValidationResult.time),
                            totalEnergy: roundToTwoDigits(
                                firstWaypointValidationResult?.remainingEnergy -
                                    lastWaypointValidationResult?.remainingEnergy
                            ).toString(),
                        },
                        {
                            totalDistance: {
                                value: (
                                    <Box h={56} w="100%">
                                        <FederatedMapRoute routeId={`${id}`} preserveDrawingBuffer />
                                    </Box>
                                ),
                                colSpan: 3,
                            },
                        }
                    );
                }
            }
        }
        return routes;
    };

    return (
        <Box>
            {match(routeOption)
                .when(
                    (routeOption) => routeOption === undefined || routeOption === null,
                    () => <Text>Sorry, we couldn&apos;t find any routes for this mission</Text>
                )
                .when(
                    (routeOption) => routeOption?.routes === undefined || routeOption?.routes?.length === 0,
                    () => <Text>Route validation is currently running. Please wait to see results</Text>
                )
                .otherwise(() => (
                    <>
                        <Text mb={3} fontWeight="bold" textAlign="center">
                            Valid Flight Plan Routes
                        </Text>
                        {getRoutes().length > 0 ? (
                            <DataTable
                                data={getRoutes()}
                                headers={[
                                    {
                                        key: "totalDistance",
                                        name: "Est Total Distance",
                                    },
                                    {
                                        key: "totalTime",
                                        name: "Est Total Time",
                                    },
                                    {
                                        key: "totalEnergy",
                                        name: "Est Total Energy",
                                    },
                                ]}
                            />
                        ) : (
                            <Text textAlign="center">No valid routes found</Text>
                        )}
                    </>
                ))}
        </Box>
    );
};
