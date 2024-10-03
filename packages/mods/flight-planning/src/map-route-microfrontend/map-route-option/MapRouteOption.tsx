import { LngLatBounds } from "maplibre-gl";
import type { Route, RouteOption } from "@voloiq/flight-planning-api/v1";
import { Map, MapFocusController } from "@voloiq/map";
import { RouteLayer } from "./RouteLayer";
import { NotamLayerWrapper } from "./notams-layer/NotamLayerWrapper";

export type MapRouteOptionProps = {
    focusBounds: LngLatBounds;
    routeOption: RouteOption;
    routes: Route[];
};

export const MapRouteOption = (props: MapRouteOptionProps) => {
    const { focusBounds, routeOption, routes } = props;

    return (
        <MapFocusController>
            <Map zoom={12} isSatellite focusOn={focusBounds} withZoomControls={false}>
                {routes.map((route) => (
                    <RouteLayer key={route.id} route={route} />
                ))}
                <NotamLayerWrapper routeOption={routeOption} />
            </Map>
        </MapFocusController>
    );
};
