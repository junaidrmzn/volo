import { useIsAuthorizedTo } from "@voloiq/auth";
import { useGetConductedRouteFileStatusQuery } from "@voloiq/flight-planning-api/v1";
import { ConductedRouteToggleButton } from "./ConductedRouteToggleButton";
import { DeviationFromPlannedRouteToggleButton } from "./DeviationFromPlannedRouteToggleButton";

type RouteComparisonToggleButtonsProps = {
    showConductedRoute: boolean;
    onToggleShowConductedRoute: () => void;
    showDeviationFromPlannedRoute: boolean;
    onToggleShowDeviationFromPlannedRoute: () => void;
    routeId: string | number;
};
export const RouteComparisonToggleButtons = (props: RouteComparisonToggleButtonsProps) => {
    const {
        showConductedRoute,
        onToggleShowConductedRoute,
        showDeviationFromPlannedRoute,
        onToggleShowDeviationFromPlannedRoute,
        routeId,
    } = props;
    const canReadConductedRoute = useIsAuthorizedTo(["read"], ["ConductedRouteGraph"]);
    const { data: conductedRouteFileStatus } = useGetConductedRouteFileStatusQuery(
        routeId,
        !!routeId && canReadConductedRoute
    );
    return (
        <>
            <ConductedRouteToggleButton
                showConductedRoute={showConductedRoute}
                toggleConductedRoute={onToggleShowConductedRoute}
                routeId={routeId}
                isDisabled={!conductedRouteFileStatus?.uploaded}
            />
            <DeviationFromPlannedRouteToggleButton
                showDeviationFromPlannedRoute={showDeviationFromPlannedRoute}
                toggleDeviationFromPlannedRoute={onToggleShowDeviationFromPlannedRoute}
                routeId={routeId}
                isDisabled={!conductedRouteFileStatus?.uploaded}
            />
        </>
    );
};
