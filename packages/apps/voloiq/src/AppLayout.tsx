import { Box, Flex } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useRegisterRouteTemplates } from "@voloiq/notification-provider";
import { Outlet } from "@voloiq/routing";
import { VoloIqNavigationBar } from "./navigation-bar/VoloIqNavigationBar";
import { flightTestSuiteRedirects } from "./routes/flightTestSuiteRedirects";
import { useRerouting } from "./routes/useRerouting";

export const AppLayout = () => {
    useRerouting({ redirects: flightTestSuiteRedirects });
    const { isFeatureFlagEnabled } = useFeatureFlags();

    useRegisterRouteTemplates({
        routeTemplates: [
            {
                entityType: "MISSION",
                getEntityRoute: (entityId) => `/air-operations/mission-management/missions/overview/${entityId}`,
            },
            {
                entityType: "Log",
                getEntityRoute: (entityId) => `/logbook/overview/${entityId}`,
            },
            {
                entityType: "Flight Test Order",
                getEntityRoute: (entityId) =>
                    isFeatureFlagEnabled("vte-1596")
                        ? `/flight-test-suite/orders/${entityId}`
                        : `flight-test-definition/flight-test-orders/overview/${entityId}`,
            },
        ],
    });

    return (
        <Flex w="100%" wrap="nowrap" height="100vh">
            <VoloIqNavigationBar />
            <Box flex={1} overflow="auto">
                <Outlet />
            </Box>
        </Flex>
    );
};
