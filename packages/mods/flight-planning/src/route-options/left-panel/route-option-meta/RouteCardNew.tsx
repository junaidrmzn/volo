import { Box, HStack, useToken } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { RouteCardActions, RouteCardBody, RouteCardHeader } from "@voloiq/flight-planning-components";
import { useFlightStatusContext } from "../../../contexts/flight-status";
import { useDisplayedRoutes } from "../../../features/displayed-routes/hooks/useDisplayedRoutes";
import { useRefocusCallback } from "../../../features/overview/hooks/useRefocusCallback";
import { useSelectedRoute } from "../../../features/selected-route";

export type RouteCardProps = {
    route?: Route;
    key?: number;
    openRouteDetails?: (value: boolean) => void;
    hasActionButton?: boolean;
};

export const RouteCardNew = (props: RouteCardProps) => {
    const { key, route, openRouteDetails, hasActionButton } = props;
    const { validationStatus, duration } = useFlightStatusContext();

    const gray = useToken("colors", "gray.500");
    const { selectRoute } = useSelectedRoute();
    const { handleRefocusCallback } = useRefocusCallback();
    const { displayRoute } = useDisplayedRoutes();

    const handleRouteDetails = () => {
        if (route) {
            displayRoute(route);
            selectRoute(route?.id);
            handleRefocusCallback(route);
        }
        if (openRouteDetails) openRouteDetails(true);
    };

    return (
        <Box
            key={key}
            w="100%"
            bg="bgContentLayer"
            borderRadius="sm"
            borderColor={gray}
            borderLeftWidth={6}
            onClick={() => handleRouteDetails()}
        >
            <HStack py={3} pl={6} pr={3}>
                <Box w="100%">
                    <RouteCardHeader
                        routeName={route?.name ?? ""}
                        validationStatus={route?.validationStatus ?? validationStatus}
                    />
                    <RouteCardBody distance={route?.distance ?? 0} duration={route?.duration ?? duration} />
                </Box>
                {hasActionButton && <RouteCardActions />}
            </HStack>
        </Box>
    );
};
