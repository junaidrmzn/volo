import { useGetRouteComparison } from "@voloiq/flight-planning-api/v1";
import { colors } from "../../../utils";
import { useConductedRouteLayerOld } from "../hooks";

type ConductedRouteLayerProps = {
    routeId: number | string;
};
export const ConductedRouteLayerOld = (props: ConductedRouteLayerProps) => {
    const { routeId } = props;
    const routeComparisonQuery = useGetRouteComparison({ routeId, manual: false });

    const displayId = `${routeId}-conducted-route`;
    const lineOpacity = 0.8;
    const routeColor = colors.green[500];
    const bounds = routeComparisonQuery?.data?.conductedRoute;

    useConductedRouteLayerOld({ displayId, routeColor, lineOpacity, bounds });

    return null;
};
