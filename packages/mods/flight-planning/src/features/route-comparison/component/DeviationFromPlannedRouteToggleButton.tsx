import { Box, FormControl, HStack, ListItem, Spinner, Switch, Text } from "@volocopter/design-library-react";
import { useGetQueryState } from "@voloiq/flight-planning-api/v1";
import type { RouteComparison } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../translations";

type DeviationFromPlannedRouteToggleButtonProps = {
    showDeviationFromPlannedRoute: boolean;
    toggleDeviationFromPlannedRoute: () => void;
    routeId: string | number;
    isDisabled?: boolean;
};

export const DeviationFromPlannedRouteToggleButton = (props: DeviationFromPlannedRouteToggleButtonProps) => {
    const { showDeviationFromPlannedRoute, toggleDeviationFromPlannedRoute, routeId, isDisabled } = props;
    const { t } = useFlightPlanningTranslation();
    const { isFetching } = useGetQueryState<RouteComparison>(["routes", { routeId }, "route-comparison"]);

    return (
        <ListItem>
            <HStack justifyContent="space-between" flex="0 1 auto">
                <HStack alignItems="flex-start">
                    <Text size="small">{t("routeComparison.deviationFromPlannedRoute.title")}</Text>
                    {isFetching && <Spinner size="xs" />}
                </HStack>
                <Box>
                    <FormControl>
                        <Switch
                            data-testid="switch-show-deviation-from-planned-route"
                            isChecked={showDeviationFromPlannedRoute}
                            isDisabled={isFetching || isDisabled}
                            onChange={toggleDeviationFromPlannedRoute}
                        />
                    </FormControl>
                </Box>
            </HStack>
        </ListItem>
    );
};
