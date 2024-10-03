import { Box, HStack, Text, useColorModeValue } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useFlightStatusContext } from "../../contexts/flight-status";
import { useFlightPlanningTranslation } from "../../translations";
import { FlightStatusItem } from "./FlightStatusItem";
import { ValidationStatus } from "./components";

export type FlightStatusBarProps = {
    route: Route;
};

export const FlightStatusBar = (props: FlightStatusBarProps) => {
    const { route } = props;
    const { t } = useFlightPlanningTranslation();
    const smallTextColor = useColorModeValue("gray.700", "darkBlue.300");
    const { remainingEnergy, validationStatus, duration } = useFlightStatusContext();

    const routeDuration = (duration / 60).toFixed(0);
    const distanceInNauticalMiles = (route.distance / 1852).toFixed(1);

    return (
        <Box position="absolute" top={6} right={6}>
            <HStack columnGap="1" data-testid="flight-status-bar">
                <FlightStatusItem icon="mapPin">
                    <Text color={smallTextColor} size="small">
                        {t("flightStatusBar.routeDistance")}
                    </Text>
                    <Text fontWeight="bold">{distanceInNauticalMiles} NM</Text>
                </FlightStatusItem>
                <FlightStatusItem icon="clock">
                    <Text color={smallTextColor} size="small">
                        {t("flightStatusBar.flightTime")}
                    </Text>
                    <Text fontWeight="bold">{routeDuration || t("common.notAvailable")} min</Text>
                </FlightStatusItem>
                <FlightStatusItem icon="battery">
                    <Text color={smallTextColor} size="small">
                        {t("flightStatusBar.remainingBattery")}
                    </Text>
                    <Text fontWeight="bold">{remainingEnergy || t("common.notAvailable")} kWh</Text>
                </FlightStatusItem>
                <FlightStatusItem icon="alert">
                    <Text color={smallTextColor} size="small">
                        {t("flightStatusBar.routeValidation")}
                    </Text>
                    <ValidationStatus validationStatus={validationStatus} />
                </FlightStatusItem>
            </HStack>
        </Box>
    );
};
