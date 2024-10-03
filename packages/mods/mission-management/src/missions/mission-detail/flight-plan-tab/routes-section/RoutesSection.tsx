import { Text, VStack } from "@volocopter/design-library-react";
import { RouteAssignment } from "@voloiq/network-schedule-management-api/v1";
import { IconCard } from "@voloiq/network-scheduling-components";
import { RouteCard } from "./RouteCard";
import { alphabeticStringGenerator } from "./alphabeticStringGenerator";
import { useRoutesSectionTranslation } from "./translations/useRoutesSectionTranslation";

export type RoutesSectionProps = {
    routes: RouteAssignment[];
    routesFilter: (routes: RouteAssignment) => boolean;
    notFoundLabel: string;
    notFoundText: string;
    getHeading: (numberOfRoutes: number) => string;
};

export const RoutesSection = (props: RoutesSectionProps) => {
    const { routes, getHeading, notFoundLabel, notFoundText, routesFilter } = props;
    const { t } = useRoutesSectionTranslation();

    const routeNameGenerator = alphabeticStringGenerator();
    const filteredRoutes = routes.filter(routesFilter);
    return (
        <VStack alignItems="stretch">
            <Text>{getHeading(filteredRoutes.length)}</Text>
            {filteredRoutes.map((route) => (
                <RouteCard
                    key={route.id}
                    routeName={t("Route {routeIdentifier}", {
                        routeIdentifier: routeNameGenerator.next().value,
                    })}
                    route={route}
                />
            ))}
            {filteredRoutes.length === 0 && (
                <IconCard label={notFoundLabel} helpText={notFoundText} backgroundColor="white" />
            )}
        </VStack>
    );
};
