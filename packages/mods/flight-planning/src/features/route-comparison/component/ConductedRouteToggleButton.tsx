import { Box, FormControl, HStack, ListItem, Spinner, Switch, Text } from "@volocopter/design-library-react";
import { useGetQueryState } from "@voloiq/flight-planning-api/v1";
import type { RouteComparison } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../translations";

type ConductedRouteToggleButtonProps = {
    showConductedRoute: boolean;
    toggleConductedRoute: () => void;
    routeId: string | number;
    isDisabled?: boolean;
};

export const ConductedRouteToggleButton = (props: ConductedRouteToggleButtonProps) => {
    const { showConductedRoute, toggleConductedRoute, routeId, isDisabled } = props;
    const { t } = useFlightPlanningTranslation();
    const { isFetching } = useGetQueryState<RouteComparison>(["routes", { routeId }, "route-comparison"]);

    return (
        <ListItem>
            <HStack justifyContent="space-between" flex="0 1 auto">
                <HStack alignItems="flex-start">
                    <Text size="small">{t("routeComparison.conductedRoute.title")}</Text>
                    {isFetching && <Spinner size="xs" />}
                </HStack>
                <Box>
                    <FormControl>
                        <Switch
                            data-testid="switch-show-conducted-route"
                            isChecked={showConductedRoute}
                            isDisabled={isFetching || isDisabled}
                            onChange={toggleConductedRoute}
                        />
                    </FormControl>
                </Box>
            </HStack>
        </ListItem>
    );
};
