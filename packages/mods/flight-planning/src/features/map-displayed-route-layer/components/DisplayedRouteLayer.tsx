import { Route, useGetWaypoints } from "@voloiq/flight-planning-api/v1";
import { colors } from "../../../utils";
import { useRouteDisplayedLayer } from "../hooks";

type DisplayedRouteLayerProps = {
    route: Route;
};
export const DisplayedRouteLayer = (props: DisplayedRouteLayerProps) => {
    const { route } = props;
    const waypointQuery = useGetWaypoints(route.id);
    const routeColor = colors.blue[100];
    useRouteDisplayedLayer(route, waypointQuery.data, routeColor);

    return null;
};
