import { Box, Button, HStack, Table, Tbody, Text } from "@volocopter/design-library-react";
import { RequirePermissions } from "@voloiq/auth";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../translations";
import { RouteListItem } from "./RouteListItem";
import { RouteListMenu } from "./RouteListMenu";

type RouteListProps = {
    handleCreateNewRoute: () => void;
    routes: Route[];
};

export const RouteList = (props: RouteListProps) => {
    const { handleCreateNewRoute, routes } = props;
    const { t: translate } = useFlightPlanningTranslation();

    return (
        <>
            <HStack justifyContent="space-between" minHeight="44px" p={3} flex="0 1 auto">
                <Text data-testid="route-list-heading" size="small" fontWeight="bold">
                    {translate("common.routes")}
                </Text>
                <HStack justifyContent="flex-end">
                    <RequirePermissions resources={["Route"]} actions={["create"]}>
                        <Button
                            variant="primary"
                            size="sm"
                            aria-label={translate("routeList.add route")}
                            onClick={handleCreateNewRoute}
                            data-testid="route-list-add"
                        >
                            {translate("routeList.add button label")}
                        </Button>
                    </RequirePermissions>

                    <RouteListMenu />
                </HStack>
            </HStack>
            <Box overflowY="auto" flex="1 1 auto">
                <Table variant="striped" size="xs">
                    <Tbody>
                        {routes.map((route) => (
                            <RouteListItem route={route} key={`route-list-${route.id}-${route.createdAt}`} />
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};
