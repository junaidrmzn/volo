import { LngLatBounds } from "maplibre-gl";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { Map, MapFocusController } from "@voloiq/map";
import { RouteLayer } from "./RouteLayer";

export type MapRouteProps = {
    waypoints: Waypoint[];
    preserveDrawingBuffer?: boolean;
};

export const MapRoute = (props: MapRouteProps) => {
    const { waypoints, preserveDrawingBuffer = false } = props;

    if (waypoints.length < 2) return null;

    const firstWaypoint = waypoints.at(0) as Waypoint;
    const lastWaypoint = waypoints.at(-1) as Waypoint;

    return (
        <MapFocusController>
            <Map
                zoom={12}
                isSatellite
                focusOn={new LngLatBounds(firstWaypoint, lastWaypoint)}
                withZoomControls={false}
                preserveDrawingBuffer={preserveDrawingBuffer}
            >
                <RouteLayer waypoints={waypoints} />
            </Map>
        </MapFocusController>
    );
};
