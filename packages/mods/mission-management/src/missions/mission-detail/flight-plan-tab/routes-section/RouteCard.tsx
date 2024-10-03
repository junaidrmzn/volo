import { Divider, HStack, Text, VStack } from "@volocopter/design-library-react";
import { RouteAssignment } from "@voloiq/network-schedule-management-api/v1";
import { IconCard, MapRoute } from "@voloiq/network-scheduling-components";
import { ValidationStatistics } from "./ValidationStatistics";
import { useRoutesSectionTranslation } from "./translations/useRoutesSectionTranslation";

export type RouteCardProps = {
    route: RouteAssignment;
    routeName: string;
};

export const RouteCard = (props: RouteCardProps) => {
    const { t } = useRoutesSectionTranslation();
    const { route, routeName } = props;
    const { id, waypoints } = route;
    const firstWaypoint = waypoints.at(0);
    const lastWaypoint = waypoints.at(-1);
    const firstWaypointValidationResult = firstWaypoint?.validationResult;
    const lastWaypointValidationResult = lastWaypoint?.validationResult;

    return (
        <VStack backgroundColor="bgContentLayer" alignItems="stretch" py={2} px={3} spacing={1.5} borderRadius="md">
            <HStack alignItems="flex-start">
                <Text fontWeight="semibold" lineHeight="tall">
                    {routeName}
                </Text>
            </HStack>
            <Divider />
            {firstWaypointValidationResult && lastWaypointValidationResult ? (
                <ValidationStatistics
                    totalDistanceInMeters={firstWaypointValidationResult.remainingDistance3d}
                    totalEnergyInKWh={
                        firstWaypointValidationResult?.remainingEnergy - lastWaypointValidationResult?.remainingEnergy
                    }
                    totalTimeInSeconds={lastWaypointValidationResult.time}
                />
            ) : (
                <IconCard
                    label={t("No validation statistics found")}
                    helpText={t("Sorry, we couldn't find any validation statistics for this route")}
                />
            )}
            <MapRoute routeId={`${id}`} isInitiallyShown />
        </VStack>
    );
};
