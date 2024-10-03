import { Box } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { LayoutSection } from "@voloiq/flight-planning-components";
import { useDisplayedRoutes } from "../../../features/displayed-routes/hooks";
import { useRefocusCallback } from "../../../features/overview/hooks";
import { useSelectedRoute } from "../../../features/selected-route/hooks";
import { useRoutesTranslation } from "../routes/translations";
import { RouteCardNew } from "./RouteCardNew";

type RouteOptionDetailProps = {
    routeOptionName?: string;
    routes: Route[];
    openRouteDetails: (value: boolean) => void;
};

export const RoutesNew = (props: RouteOptionDetailProps) => {
    const { routeOptionName, routes, openRouteDetails } = props;
    const { t } = useRoutesTranslation();
    const { displayRoute } = useDisplayedRoutes();
    const { selectRoute } = useSelectedRoute();
    const { handleRefocusCallback } = useRefocusCallback();

    return (
        <Box w="348px" pos="absolute" top="38vh" fontSize={12} h="40vh">
            <LayoutSection
                firstLabel={routeOptionName || t("notAvailable")}
                secondLabel={t("routeOptions")}
                hasAddButton
                hasActionItem
            >
                <Box w="100%" overflow="scroll" h="40vh">
                    {routes.map((route) => (
                        <RouteCardNew
                            key={route.id}
                            route={route}
                            openRouteDetails={() => {
                                displayRoute(route);
                                selectRoute(route?.id);
                                handleRefocusCallback(route);
                                openRouteDetails(true);
                            }}
                        />
                    ))}
                </Box>
            </LayoutSection>
        </Box>
    );
};
