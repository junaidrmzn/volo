import { Skeleton } from "@volocopter/design-library-react";
import { useGetWaypoints } from "@voloiq/flight-planning-api/v1";
import { ServiceProviders } from "../../ServiceProviders";
import { MapRoute } from "./MapRoute";

export type MapRouteWithDataProps = {
    routeId: string;
    preserveDrawingBuffer?: boolean;
};

const MapRouteWithDataWithoutProvider = (props: MapRouteWithDataProps) => {
    const { routeId, preserveDrawingBuffer = false } = props;
    const { data: waypoints } = useGetWaypoints(routeId);

    return (
        <Skeleton isLoading={!waypoints} height="100%" width="100%">
            {waypoints && <MapRoute waypoints={waypoints} preserveDrawingBuffer={preserveDrawingBuffer} />}
        </Skeleton>
    );
};

export const MapRouteWithData = (props: MapRouteWithDataProps) => (
    <ServiceProviders>
        <MapRouteWithDataWithoutProvider {...props} />
    </ServiceProviders>
);
